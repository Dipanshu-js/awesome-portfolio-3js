import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");
  const screenTexture = useTexture("/screen.png");
  const meshRef = useRef();

  useEffect(() => {
    if (!scene || !screenTexture) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        // ✅ ONLY TARGET SCREEN
        if (child.name === "MY_SCREEN_MY_SCREEN_0") {
          console.log("✅ Screen FOUND:", child.name);

          // ⚡ IMPORTANT FIXES
          screenTexture.flipY = false;

          // ✅ DO NOT replace material
          child.material.map = screenTexture;

          // 🔥 Glow effect (realistic screen)
          child.material.emissiveMap = screenTexture;
          child.material.emissive.set("#ffffff");
          child.material.emissiveIntensity = 1.5;

          // improves brightness
          child.material.toneMapped = false;

          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, screenTexture]);

  // optional rotation for mobile
  useFrame((state, delta) => {
    if (meshRef.current && isMobile) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />

      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      <pointLight intensity={1} />

      <primitive
        object={scene}
        scale={0.75}
        position={isMobile ? [0, -3, 0] : [0, -3.25, -1.5]}
        rotation={isMobile ? [0, 0, 0] : [-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={
        isMobile
          ? { position: [0, 0, 20], fov: 50 }
          : { position: [20, 3, 5], fov: 25 }
      }
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        )}

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

// preload
useGLTF.preload("./desktop_pc/scene.gltf");
