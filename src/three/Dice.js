import React, { useRef, useEffect, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from 'use-cannon'
import { useSpring } from '@react-spring/core'
import { a } from "@react-spring/three"
import { HTML } from 'drei'
import { useStore } from '../store'
import shallow from 'zustand/shallow'

export default function Dice({ dice }) {
  const [rotation, setRotation] = useState()
  const [diceNumber, setDiceNumber] = useState(0)
  const [currentSlot, setCurrentSlot] = useState()
  const [haveSet, setHaveSet] = useState(false)
  const [hover, set] = useState(false)

  const { slots, setSlot } = useStore(state => ({ slots: state.slots, setSlot: state.setSlot }), shallow)
  let setApi = useStore(state => state.setApi)
  let setDiceOne = useStore(state => state.setDiceOne)
  let setDiceTwo = useStore(state => state.setDiceTwo)
  let setDiceThree = useStore(state => state.setDiceThree)
  let setDiceFour = useStore(state => state.setDiceFour)
  let setDiceFive = useStore(state => state.setDiceFive)
  const { roll } = useStore(state => state.api)
  const velocity = useRef([1, 1, 1])

  useEffect(() => {
    switch (dice.id) {
      case 1:
        if (diceNumber) setDiceOne(diceNumber)
        break
      case 2:
        if (diceNumber) setDiceTwo(diceNumber)
        break
      case 3:
        if (diceNumber) setDiceThree(diceNumber)
        break
      case 4:
        if (diceNumber) setDiceFour(diceNumber)
        break
      case 5:
        if (diceNumber) setDiceFive(diceNumber)
        break
      default:
        break;
    }
  }, [diceNumber, dice.id, setDiceOne, setDiceTwo, setDiceThree, setDiceFour, setDiceFive])

  const [ref, api] = useBox(() => ({
    mass: 0.1,
    position: [slots[dice.id - 1].position[0], slots[dice.id - 1].position[1], slots[dice.id - 1].position[2]],
    allowSleep: false,
    sleepSpeedLimit: 1,
    args: [0.3, 0.3, 0.3],
    material: {
      friction: 1,
      restitution: 1
    },
    onCollide: (e) => {
      roll(e.contact.impactVelocity)
    }
  }))

  useEffect(() => {
    setApi(dice.id, api)
  }, [api, dice.id, setApi])

  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])

  useEffect(() => {
    if (rotation) {
      if (Math.abs(Math.round(velocity.current[0])) === 0 && Math.abs(Math.round(velocity.current[1])) === 0 && Math.abs(Math.round(velocity.current[2])) === 0) {
        if (!haveSet) {
          setDiceNumber(getDiceNumber(parseFloat(rotation[0].toFixed(2)), parseFloat(rotation[1].toFixed(2))))
          setHaveSet(true)
          setTimeout(() => {
            setHaveSet(false)
          }, 1000);
        }
      }
    }
  }, [rotation, haveSet])

  useFrame(() => {
    let velX = Math.floor(Math.abs(velocity.current[0]))
    let velY = Math.floor(Math.abs(velocity.current[1]))
    let velZ = Math.floor(Math.abs(velocity.current[2]))
    let velocitys = [velX, velY, velZ].toString()
    if (velocitys === [0, 0, 0].toString()) {
      if (Math.abs(parseFloat(ref.current.rotation.x.toFixed(1))) === 0 && Math.abs(parseFloat(ref.current.rotation.z.toFixed(1))) === 0) {
        setRotation([0, 0])
      } else {
        setRotation([parseFloat(ref.current.rotation.x.toFixed(2)), parseFloat(ref.current.rotation.z.toFixed(2))])
      }
    }
  })

  const getDiceNumber = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0) return 1
    if (rotationX === -3.14 && rotationZ === 0) return 1
    if (rotationX === 0 && rotationZ === 3.14) return 1
    if (rotationX === 0 && rotationZ === -3.14) return 1

    if (rotationX === 3.14 && rotationZ === -1.57) return 2
    if (rotationX === 0 && rotationZ === 1.57) return 2

    if (rotationX === -1.57) return 3

    if (rotationX === 1.57) return 4

    if (rotationX === 0 && rotationZ === -1.57) return 5
    if (rotationX === 3.14 && rotationZ === 1.57) return 5

    if (rotationX === 3.14 && rotationZ === 3.14) return 6
    if (rotationX === 3.14 && rotationZ === -3.14) return 6
    if (rotationX === -3.14 && rotationZ === 3.14) return 6
    if (rotationX === 0 && rotationZ === 0) return 6
  }

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
      api.position.set((Math.random() * 2) + 1, 0.2, (Math.random() * 2) + 0.5)
      dice.set = false
      setSlot(currentSlot, true)
      setCurrentSlot(null)
    }
  }

  const props = useSpring({ color: hover ? '#8c2a1c' : '#de381f' })

  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto'
  }, [hover])

  const { nodes } = useLoader(GLTFLoader, '/dice/scene.gltf')
  return (
    <a.group
      onPointerOver={(e) => {
        e.stopPropagation()
        set(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        set(false)
      }}
      onClick={(e) => {
        setDice(dice)
        e.stopPropagation()
      }} castShadow receiveShadow scale={[0.4, 0.4, 0.4]} ref={ref} dispose={null}>
      <group castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <group castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <group castShadow receiveShadow position={[2.34, 0, 0]}>
            <group castShadow receiveShadow position={[-2.33, -0.01, 0]} scale={[0.41, 0.41, 0.41]}>
              <mesh castShadow receiveShadow geometry={nodes.pasted__pSphere51_blinn1_0.geometry} >
                <a.meshPhysicalMaterial attach='material' color={props.color} />
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.pasted__pSphere51_blinn2_0.geometry} >
                <meshPhysicalMaterial attach='material' color='#fff' />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  )
}
