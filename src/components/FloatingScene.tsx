import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  mouseX: number;
  mouseY: number;
}

const TorusKnotShape = ({ mouseX, mouseY }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (mouseX * 0.35 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x +=
        (-mouseY * 0.25 - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1}>
          <torusKnotGeometry args={[1.4, 0.42, 220, 24, 2, 3]} />
          <MeshDistortMaterial
            color="#5b5bd6"
            emissive="#4338ca"
            emissiveIntensity={0.9}
            distort={0.25}
            speed={2.5}
            roughness={0.05}
            metalness={0.85}
            transparent={true}
            opacity={0.92}
          />
        </mesh>
      </Float>

      {/* Outer wireframe ring */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.6}>
          <torusGeometry args={[1, 0.008, 8, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.6}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={3.2}>
          <torusGeometry args={[1, 0.005, 8, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#7c7cf8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

interface FloatingSceneProps {
  mouseX: number;
  mouseY: number;
}

const SceneContent = ({ mouseX, mouseY }: FloatingSceneProps) => (
  <>
    <ambientLight intensity={0.15} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#6366f1" />
    <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#ec4899" />
    <pointLight position={[3, 2, 3]} intensity={2.5} color="#8b5cf6" distance={12} decay={2} />
    <pointLight position={[-3, -2, 1]} intensity={1.5} color="#6366f1" distance={10} decay={2} />

    <TorusKnotShape mouseX={mouseX} mouseY={mouseY} />
    <ParticleField />

    <Stars
      radius={60}
      depth={60}
      count={800}
      factor={2}
      saturation={0.3}
      fade
      speed={0.3}
    />
  </>
);

const FloatingScene = ({ mouseX, mouseY }: FloatingSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
};

export default FloatingScene;
