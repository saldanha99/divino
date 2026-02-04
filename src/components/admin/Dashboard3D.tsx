'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { EarthGlobe } from './EarthGlobe';
import { FleetModel } from './FleetModel';

export default function Dashboard3D() {
    return (
        <div className="h-[500px] w-full bg-slate-900 rounded-xl overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 text-white">
                <h2 className="text-xl font-bold">Monitoramento de Frota em Tempo Real</h2>
                <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-brand-confirm"></span> Disponível
                    </span>
                    <span className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-brand-alert"></span> Manutenção
                    </span>
                </div>
            </div>

            <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

                <group position={[-3, 0, 0]}>
                    <EarthGlobe />
                </group>

                <Stage intensity={0.5} environment="city" adjustCamera={false}>
                    <group position={[2, 0, 0]}>
                        <FleetModel status="AVAILABLE" />
                    </group>
                    <group position={[4, 0, 1]}>
                        <FleetModel status="MAINTENANCE" />
                    </group>
                </Stage>

                <OrbitControls autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
