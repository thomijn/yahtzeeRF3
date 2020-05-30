import React, { Suspense } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { Physics, usePlane, useBox } from 'use-cannon'
import Model from './Scene';
import { useStore } from './store';
import * as THREE from "three"
import woodImg from "./wood.jpg"

function Ground(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

    return (
        <mesh ref={ref} receiveShadow position={[0, -1, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[50, 50]} />
            <shadowMaterial attach="material" color="black" />
        </mesh>
    )
}

function Wall() {
    const wood = useLoader(THREE.TextureLoader, woodImg)

    const [ref] = useBox(() => ({
        position: [1, 0.25, 0],
        args: [0.2, 0.5, 5]
    }))

    return (
        <mesh castShadow ref={ref} >
            <boxBufferGeometry attach='geometry' args={[0.2, 0.5, 5]} />
            <meshPhysicalMaterial attach='material' map={wood} />
        </mesh>
    )
}

export default () => {
    const { dices } = useStore()

    console.log(dices)
    return (
        <>
            <Canvas camera={{ position: [0, 3, 3] }} colorManagement shadowMap>
                {/* <color attach="background" args={['#00401b']} /> */}
                <ambientLight />
                <directionalLight
                    position={[-8, 12, 8]}
                    castShadow
                />

                <Physics>
                    <Ground />
                    <Suspense fallback={null}>
                        {dices.map(dice => <Model key={dice.id} dice={dice} />)}
                        {/* <Wall /> */}
                    </Suspense>
                </Physics>
            </Canvas>
        </>
    )
}

