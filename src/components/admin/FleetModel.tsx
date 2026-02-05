'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FleetModel({ status }: { status: 'AVAILABLE' | 'MAINTENANCE' }) {
    const groupRef = useRef<THREE.Group>(null);

    const color = status === 'AVAILABLE' ? '#2ecc71' : '#e74c3c';

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <group ref={groupRef} dispose={null} scale={0.5}>
            {/* Body */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1.5, 1, 2]} />
                <meshStandardMaterial color="#F4D03F" />
            </mesh>
            {/* Cab */}
            <mesh position={[0, 1.25, 0.5]}>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshStandardMaterial color="#2d3436" />
            </mesh>
            {/* Arm */}
            <mesh position={[0, 0.5, 1.5]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[0.3, 0.3, 2]} />
                <meshStandardMaterial color="#2d3436" />
            </mesh>
            {/* Bucket */}
            <mesh position={[0, -0.5, 2.2]}>
                <boxGeometry args={[0.8, 0.5, 0.5]} />
                <meshStandardMaterial color="#F4D03F" />
            </mesh>
            {/* Tracks */}
            <mesh position={[0.6, 0, 0]}>
                <boxGeometry args={[0.3, 0.5, 2.2]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[-0.6, 0, 0]}>
                <boxGeometry args={[0.3, 0.5, 2.2]} />
                <meshStandardMaterial color="#000" />
            </mesh>

            {/* Status Indicator */}
            <mesh position={[0, 2, 0]}>
                <sphereGeometry args={[0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
        </group>
    );
}
