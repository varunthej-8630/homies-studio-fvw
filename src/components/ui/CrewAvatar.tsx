import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, PerspectiveCamera, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

const Avatar: React.FC<{ color: string, speed?: number }> = ({ color, speed = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * speed;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.5, 16, 16]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      <Cylinder args={[0.1, 0.1, 0.2]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Box args={[0.8, 1, 0.4]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Box args={[0.2, 0.8, 0.2]} position={[-0.5, 0.3, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
      <Box args={[0.2, 0.8, 0.2]} position={[0.5, 0.3, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
    </group>
  );
};

interface CrewAvatarProps {
  color: string;
  isHovered?: boolean;
  isActive?: boolean;
}

const CrewAvatar: React.FC<CrewAvatarProps> = ({ color, isHovered, isActive }) => {
  if (!isActive) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className="w-24 h-24 rounded-full blur-2xl opacity-20 animate-pulse" 
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[320px] pointer-events-none">
      <Suspense fallback={<div className="w-full h-full bg-black/5 rounded-2xl animate-pulse" />}>
        <Canvas 
          shadows={false} 
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            alpha: true
          }} 
          dpr={[1, 1]}
        >
          <PerspectiveCamera makeDefault position={[0, 0.5, 4]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Avatar color={color} speed={isHovered ? 2 : 0.5} />
          <Environment preset="city" />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CrewAvatar;
