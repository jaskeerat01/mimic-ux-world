
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color('#00FFFF'); // Cyan
    const color2 = new THREE.Color('#FFFFFF'); // White

    for (let i = 0; i < count * 3; i++) {
      // Position
      positions[i] = (Math.random() - 0.5) * 15;
      
      // Color (gradient between cyan and white)
      const mixFactor = Math.random();
      const color = color1.clone().lerp(color2, mixFactor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Size (slightly random)
      sizes[i] = Math.random() * 0.05 + 0.01;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );

    // Material with custom shader for better-looking particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Create a nice circular particle shape
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          
          // Soften edges
          float alpha = smoothstep(0.5, 0.4, distance);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement effect
    const mouseEffect = (event: MouseEvent) => {
      if (!particlesRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle movement based on mouse position
      particlesRef.current.rotation.x = mouseY * 0.1;
      particlesRef.current.rotation.y = mouseX * 0.1;
    };

    window.addEventListener('mousemove', mouseEffect);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (particlesRef.current) {
        // Subtle continuous rotation and movement
        particlesRef.current.rotation.z += 0.0005;
        
        // Update particle positions for floating effect
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          // Subtle vertical movement
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseEffect);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        // Clean up THREE.js objects
        if (particlesRef.current) {
          particlesRef.current.geometry.dispose();
          (particlesRef.current.material as THREE.Material).dispose();
          sceneRef.current?.remove(particlesRef.current);
        }
        
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }} 
    />
  );
}
