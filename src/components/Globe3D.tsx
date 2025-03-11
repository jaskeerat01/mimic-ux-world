
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const dotsGroupRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light for shadow
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create custom shader material for our globe
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Grid pattern
          float gridSize = 40.0;
          vec2 gridUv = fract(vUv * gridSize);
          float gridLine = max(
            smoothstep(0.95, 1.0, gridUv.x),
            smoothstep(0.95, 1.0, gridUv.y)
          );
          
          // Edge glow effect
          float edgeGlow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          // Pulsing effect
          float pulse = 0.5 + 0.5 * sin(time * 0.5);
          
          // Combine effects
          vec3 baseColor = vec3(0.0, 0.1, 0.2);
          vec3 gridColor = vec3(0.0, 1.0, 1.0);
          vec3 glowColor = vec3(0.0, 0.7, 1.0);
          
          vec3 color = baseColor;
          color = mix(color, gridColor, gridLine * 0.5);
          color = mix(color, glowColor, edgeGlow * 0.7 * pulse);
          
          // Apply transparency
          float alpha = 0.8 + edgeGlow * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      side: THREE.FrontSide,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Create network of dots and connections on the globe
    const dotsGroup = new THREE.Group();
    scene.add(dotsGroup);
    dotsGroupRef.current = dotsGroup;

    // Create ~20 points randomly distributed on the globe
    const points: THREE.Vector3[] = [];
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < 20; i++) {
      // Generate random positions on sphere
      const phi = Math.acos(-1 + Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      
      const x = Math.sin(phi) * Math.cos(theta) * 1.02;
      const y = Math.sin(phi) * Math.sin(theta) * 1.02;
      const z = Math.cos(phi) * 1.02;
      
      const position = new THREE.Vector3(x, y, z);
      points.push(position);
      
      // Create dot at position
      const dotGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(position);
      dotsGroup.add(dot);
      
      // Create small glow around dot
      const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 glow = vec3(0.0, 1.0, 1.0) * intensity;
            gl_FragColor = vec4(glow, intensity);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        glowMaterial
      );
      glowSphere.position.copy(position);
      dotsGroup.add(glowSphere);
    }

    // Create connections between some of the dots
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3,
      linewidth: 1,
    });

    // Connect each point to its 2 nearest neighbors
    for (let i = 0; i < points.length; i++) {
      // Find 2 nearest neighbors
      const distances = points.map((p, idx) => {
        if (idx === i) return Infinity;
        return points[i].distanceTo(p);
      });
      
      const sortedIndices = [...Array(points.length).keys()].sort(
        (a, b) => distances[a] - distances[b]
      );
      
      for (let j = 0; j < 2; j++) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          points[i],
          points[sortedIndices[j]],
        ]);
        
        const line = new THREE.Line(lineGeometry, connectionMaterial);
        dotsGroup.add(line);
      }
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse movement for interactive rotation
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Rotate the globe based on mouse position
      if (globeRef.current && dotsGroupRef.current) {
        // Gentle rotation that follows mouse
        const targetRotationX = mouseRef.current.y * 0.5;
        const targetRotationY = mouseRef.current.x * 0.5;
        
        // Smooth transition to target rotation
        globeRef.current.rotation.x += (targetRotationX - globeRef.current.rotation.x) * 0.05;
        globeRef.current.rotation.y += (targetRotationY - globeRef.current.rotation.y) * 0.05;
        
        // Rotate dots group to match globe
        dotsGroupRef.current.rotation.x = globeRef.current.rotation.x;
        dotsGroupRef.current.rotation.y = globeRef.current.rotation.y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Automatic rotation
      if (globeRef.current && dotsGroupRef.current) {
        // Very slow automatic rotation
        globeRef.current.rotation.y += 0.001;
        dotsGroupRef.current.rotation.y += 0.001;
        
        // Update shader uniforms
        (globeRef.current.material as THREE.ShaderMaterial).uniforms.time.value = 
          performance.now() / 1000;
      }

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
        
        // Dispose of resources
        if (globeRef.current) {
          globeRef.current.geometry.dispose();
          (globeRef.current.material as THREE.Material).dispose();
        }
        
        if (dotsGroupRef.current) {
          dotsGroupRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              (object.material as THREE.Material).dispose();
            } else if (object instanceof THREE.Line) {
              object.geometry.dispose();
              (object.material as THREE.Material).dispose();
            }
          });
        }
        
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
