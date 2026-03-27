import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, PerspectiveCamera, Environment } from '@react-three/drei';
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
      {/* Head */}
      <Sphere args={[0.5, 32, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      {/* Neck */}
      <Cylinder args={[0.1, 0.1, 0.2]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      {/* Body */}
      <Box args={[0.8, 1, 0.4]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      {/* Arms */}
      <Box args={[0.2, 0.8, 0.2]} position={[-0.5, 0.3, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
      <Box args={[0.2, 0.8, 0.2]} position={[0.5, 0.3, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
    </group>
  );
};

const CrewAvatar: React.FC<{ color: string, isHovered?: boolean }> = ({ color, isHovered }) => {
  return (
    <div className="w-full h-full min-h-[320px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0.5, 4]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Avatar color={color} speed={isHovered ? 3 : 1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default CrewAvatar;
