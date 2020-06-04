import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Pencil(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, '/pencil/scene.gltf')
  return (
    <group scale={[0.01, 0.01, 0.01]} rotation={[0, 1.5, 0]} position={[-5.4, 0.25, 0]} ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-5.22, 0, -2.24]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh castShadow receiveShadow material={materials['01_-_Default']} geometry={nodes['Cylinder001_01_-_Default_0'].geometry} />
              <mesh castShadow receiveShadow material={materials['02_-_Default']} geometry={nodes['Cylinder001_02_-_Default_0'].geometry} />
              <mesh castShadow receiveShadow material={materials['03_-_Default']} geometry={nodes['Cylinder001_03_-_Default_0'].geometry} />
              <mesh castShadow receiveShadow material={materials['08_-_Default']} geometry={nodes['Cylinder001_08_-_Default_0'].geometry} />
              <mesh castShadow receiveShadow material={materials['07_-_Default']} geometry={nodes['Cylinder001_07_-_Default_0'].geometry} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
