import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from 'use-cannon'
import { HTML } from 'drei'
import { useStore } from './store'

export default function Model({ dice }) {
  const [rotation, setRotation] = useState()
  const [diceNumber, setDiceNumber] = useState(0)
  const { slots, setSlot, reroll, setReroll, setDicesNumber } = useStore()
  const [currentSlot, setCurrentSlot] = useState()

  useEffect(() => {
    if (diceNumber) setDicesNumber(dice.id, diceNumber)
  }, [diceNumber])

  const [ref, api] = useBox(() => ({
    mass: 0.1,
    position: [Math.floor(Math.random() * 4) + 3, 0.7, Math.floor(Math.random() * 2 + -1)],
    velocity: [-3, -0.5, 0],
    rotation: [0, 0.2, 0.4],
    angularVelocity: [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
    allowSleep: false,
    args: [0.21, 0.21, 0.21],
    material: {
      friction: 1,
      restitution: 1
    },
  }))
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])
  useEffect(() => {
    rotation && getDiceNumber(parseFloat(rotation[0].toFixed(2)), parseFloat(rotation[1].toFixed(2))) && setDiceNumber(getDiceNumber(parseFloat(rotation[0].toFixed(2)), parseFloat(rotation[1].toFixed(2))))
  }, [rotation])
  useFrame(() => {
    let velX = Math.floor(Math.abs(velocity.current[0]))
    let velY = Math.floor(Math.abs(velocity.current[1]))
    let velZ = Math.floor(Math.abs(velocity.current[2]))
    let velocitys = [velX, velY, velZ].toString()

    if (velocitys === [0, 0, 0].toString()) {
      setRotation([ref.current.rotation.x, ref.current.rotation.z])
    }
  })

  const getDiceNumber = (rotationX, rotationZ) => {
    if (rotationX === -3.14 && rotationZ === -0) {
      return 1
    } else if (rotationX === 0 && rotationZ === 1.57) {
      return 2
    } else if (rotationX === -1.57) {
      return 3
    } else if (rotationX === 1.57) {
      return 4
    } else if (rotationX === 0 && rotationZ === -1.57) {
      return 5
    } else if (rotationX === 3.14 && rotationZ === -3.14) {
      return 6
    } else if (rotationX === -3.14 && rotationZ === -3.14) {
      return 6
    } else if (rotationX === -3.14 && rotationZ === 3.14) {
      return 6
    } else if (rotationX === 3.14 && rotationZ === 3.14) {
      return 6
    } else if (rotationX === -3.14 && rotationZ === -1.57) {
      return 2
    } else if (rotationX === -0 && rotationZ === -0) {
      return 6
    } else if (rotationX === -0 && rotationZ === 3.14) {
      return 1
    } else if (rotationX === 3.14 && rotationZ === -0) {
      return 1
    } else if (rotationX === -3.14 && rotationZ === 1.57) {
      return 5
    } else if (rotationX === -0 && rotationZ === 1.57) {
      return 5
    } else if (rotationX === -0 && rotationZ === 1.57) {
      return 5
    } else if (rotationX === -0 && rotationZ === -3.14) {
      return 1
    } else if (rotationX === 0 && rotationZ === 3.14) {
      return 1
    } else if (rotationX === -0 && rotationZ === 1.57) {
      return 2
    } else if (rotationX === 3.14 && rotationZ === -1.57) {
      return 2
    }
  }

  const rerollDice = useCallback(() => {
    if (!dice.set) {
      api.velocity.set(-3, -0.5, 0)
      api.angularVelocity.set(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20))
      api.rotation.set(0, 0.2, 0.4)
      api.position.set(Math.floor(Math.random() * 4) + 3, 0.7, Math.floor(Math.random() * 4 - 2))
      setTimeout(() => {
        setReroll(false)
      }, 500);
      // [Math.floor(Math.random() * 4) + 2, 2, Math.floor(Math.random() * 2)]
    }
  }, [api, dice.set, setReroll])

  useEffect(() => {
    if (reroll) rerollDice()
  }, [reroll, rerollDice])

  function setDice(dice) {
    if (!dice.set) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].open) {
          api.position.set(slots[i].position[0], slots[i].position[1], slots[i].position[2])
          setSlot(i, false)
          setCurrentSlot(i)
          dice.set = true
          break;
        }
      }
    } else {
      console.log((Math.random * 2) + 1);

      api.position.set((Math.random() * 2) + 1, 0.2, (Math.random() * 2) + 0.5)
      dice.set = false
      setSlot(currentSlot, true)
      setCurrentSlot(null)
    }
  }

  const { nodes, materials } = useLoader(GLTFLoader, '/dice/scene.gltf')
  return (
    <group onClick={(e) => {
      setDice(dice)
      e.stopPropagation()
    }} castShadow scale={[0.3, 0.3, 0.3]} ref={ref} dispose={null}>
      <HTML position={[1, 1, 0]}><h2 style={{ color: 'red' }}>{diceNumber}</h2></HTML>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[2.34, 0, 0]}>
            <group position={[-2.33, -0.01, 0]} scale={[0.41, 0.41, 0.41]}>
              <mesh castShadow material={materials.blinn1} geometry={nodes.pasted__pSphere51_blinn1_0.geometry} />
              <mesh castShadow material={materials.blinn2} geometry={nodes.pasted__pSphere51_blinn2_0.geometry} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
