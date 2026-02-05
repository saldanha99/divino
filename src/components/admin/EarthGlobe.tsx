'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function EarthGlobe() {
    const globeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <Sphere ref={globeRef} args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color="#3498db"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.4}
                />
            </Sphere>
            {/* City markers - SJC coordinates rough approx */}
            <mesh position={[1.8, 0.5, 0.8]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#F4D03F" emissive="#F4D03F" emissiveIntensity={2} />
            </mesh>
        </group>
    );
}
