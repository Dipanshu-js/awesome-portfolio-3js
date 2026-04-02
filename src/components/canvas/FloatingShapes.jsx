import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

const RotatingShape = ({ position, geometry, speedX, speedY, color, opacity = 0.25, floatAmp = 0.4 }) => {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speedX;
    mesh.current.rotation.y = state.clock.elapsedTime * speedY;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * floatAmp;
  });

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshStandardMaterial wireframe color={color} opacity={opacity} transparent depthWrite={false} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#915eff" intensity={2} />
      <pointLight position={[-5, -3, -3]} color="#00bfff" intensity={1.5} />

      <RotatingShape
        position={[-5.5, 1.5, -4]}
        geometry={<icosahedronGeometry args={[1.3, 0]} />}
        speedX={0.2}
        speedY={0.3}
        color="#915eff"
        opacity={0.2}
        floatAmp={0.5}
      />
      <RotatingShape
        position={[5.5, -1, -5]}
        geometry={<torusGeometry args={[1.1, 0.25, 8, 18]} />}
        speedX={0.15}
        speedY={0.25}
        color="#00bfff"
        opacity={0.18}
        floatAmp={0.3}
      />
      <RotatingShape
        position={[2.5, 3, -6]}
        geometry={<octahedronGeometry args={[1, 0]} />}
        speedX={0.3}
        speedY={0.2}
        color="#ff6b9d"
        opacity={0.15}
        floatAmp={0.6}
      />
      <RotatingShape
        position={[-3, -2.5, -5]}
        geometry={<tetrahedronGeometry args={[1, 0]} />}
        speedX={0.25}
        speedY={0.35}
        color="#00bfff"
        opacity={0.15}
        floatAmp={0.4}
      />
      <RotatingShape
        position={[0, -3, -7]}
        geometry={<torusKnotGeometry args={[0.7, 0.2, 64, 8]} />}
        speedX={0.18}
        speedY={0.22}
        color="#915eff"
        opacity={0.12}
        floatAmp={0.3}
      />
    </>
  );
};

const FloatingShapes = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Scene />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
