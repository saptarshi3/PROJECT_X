import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDSceneProps {
  className?: string;
}

export default function ThreeDScene({ className = "" }: ThreeDSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
    sphere?: THREE.Mesh;
    torus?: THREE.Mesh;
    particles?: THREE.Points;
  }>({});

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Check if WebGL is available
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      // WebGL not available, show fallback
      mountRef.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gradient-to-br from-orange-500/20 to-indigo-500/20 rounded-lg border border-orange-500/30">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-indigo-500 rounded-full opacity-80"></div>
            <p class="text-sm text-muted-foreground">3D Preview</p>
          </div>
        </div>
      `;
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (error) {
      // WebGL context creation failed, show fallback
      mountRef.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gradient-to-br from-orange-500/20 to-indigo-500/20 rounded-lg border border-orange-500/30">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-indigo-500 rounded-full opacity-80"></div>
            <p class="text-sm text-muted-foreground">3D Preview</p>
          </div>
        </div>
      `;
      return;
    }
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create animated sphere (globe-like)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create wireframe sphere for overlay effect
    const wireframeGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeSphere);

    // Create rotating torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 32);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xff6b35,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 5;

    // Store references
    sceneRef.current = { scene, camera, renderer, sphere, torus, particles };

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;

      // Rotate sphere
      if (sphere) {
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;
      }

      // Rotate wireframe
      if (wireframeSphere) {
        wireframeSphere.rotation.y -= 0.003;
        wireframeSphere.rotation.x -= 0.001;
      }

      // Rotate torus
      if (torus) {
        torus.rotation.y += 0.01;
        torus.rotation.z += 0.005;
      }

      // Animate particles
      if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (mountRef.current && renderer && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (renderer) {
        renderer.dispose();
      }
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: "400px" }}
    />
  );
}