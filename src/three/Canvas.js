import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { Physics, usePlane } from 'use-cannon'
import { useSpring, a } from '@react-spring/three'
import Dice from './Dice';
import Pencil from './Pencil';
import { useStore, useScore } from '../store';
import { OrbitControls, Text, HTML } from 'drei';
import ScoreSheet from './ScoreSheet';
import revue from '../assets/revue.ttf'

function Ground(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

    return (
        <mesh ref={ref} receiveShadow position={[0, -1, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" color="black" />
        </mesh>
    )
}

function Button() {
    const setReroll = useStore(state => state.setReroll)
    const setAmountRolled = useStore(state => state.setAmountRolled)
    const dices = useStore(state => state.dices)
    const setPossibleScoresCalculation = useStore(state => state.setPossibleScoresCalculation)
    const setStartedGame = useStore(state => state.setStartedGame)
    const amountRolled = useStore(state => state.amountRolled)
    const gamePhase = useStore(state => state.gamePhase)
    const setGamePhase = useStore(state => state.setGamePhase)
    const setPossibleScores = useScore(state => state.setPossibleScores)
    const setCurrentScores = useScore(state => state.setCurrentScores)
    const [hover, set] = useState(false)

    const initial = {
        aces: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,

        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        largeStraight: null,
        smallStraight: null,
        yahtzee: null,
        chance: null,
    }

    const props = useSpring({
        position: hover ? [2.1, 0.1, 2.8] : [2.1, 0, 2.8]
    })

    useEffect(() => {
        document.body.style.cursor = hover ? 'pointer' : 'auto'
    }, [hover])

    function reroll(dices, setReroll, amountRolled, setAmountRolled) {
        setReroll(true)
        for (let i = 0; i < dices.length; i++) {
            if (!dices[i].set) {
                dices[i].api.velocity.set(-5, -0.5, 0)
                dices[i].api.angularVelocity.set(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
                dices[i].api.rotation.set(0, 0.2, 0.4)
                dices[i].api.position.set(Math.floor(Math.random() * 4) + 5, 0.7, Math.floor(Math.random() * 4 - 2))
                setTimeout(() => {
                    setReroll(false)
                }, 500);
            }
        }
        setAmountRolled(amountRolled += 1)
    }

    return (
        <a.mesh
            onPointerOver={(e) => {
                e.stopPropagation()
                amountRolled <= 2 && set(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                set(false)
            }}
            onClick={() => {
                // if (gamePhase === 'Start') {
                //     setPossibleScores(initial)
                //     setCurrentScores(initial)
                // }
                setGamePhase('Roll Dice')
                if (amountRolled <= 2) {
                    reroll(dices, setReroll, amountRolled, setAmountRolled)
                    setStartedGame(true)
                    setPossibleScoresCalculation(true)
                }
            }} receiveShadow castShadow position={props.position} rotation={[-0.5 * Math.PI, 0, 0]} >
            {gamePhase === 'Start' && <Text textAlign='center' position={[-1, 0.3, 0.1]} font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" fontSize={0.5}>Start</Text>}
            {gamePhase === 'Roll Dice' && <Text textAlign='center' position={[-1, 0.3, 0.1]} font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" letterSpacing={-0.02} color={amountRolled <= 2 ? '#fff' : '#000f07'} fontSize={0.5}>Roll Dice</Text>}
            {gamePhase === 'Restart' && <Text textAlign='center' position={[-1, 0.3, 0.1]} font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" letterSpacing={-0.02} color={amountRolled <= 2 ? '#fff' : '#000f07'} fontSize={0.5}>Restart</Text>}

            <planeBufferGeometry attach='geometry' args={[4, 0.75]} />
            <meshPhysicalMaterial attach='material' color='rgb(0,48,20)' />
        </a.mesh >
    )
}

function Plate(props) {
    return (
        <mesh receiveShadow castShadow position={[-3.2, 0.05, -0.3]} rotation={[-0.5 * Math.PI, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[5, 7, 0.1]} />
            <meshPhysicalMaterial attach="material" color='#fff' />
        </mesh>
    )
}

export default () => {
    const dices = useStore(state => state.dices)
    const gamePhase = useStore(state => state.gamePhase)
    return (
        <>
            <Canvas style={{ zIndex: 1 }} camera={{ position: [0, 20, 10], fov: 25 }} colorManagement shadowMap>
                <hemisphereLight intensity={0.1} />
                <directionalLight
                    position={[-8, 20, 10]}
                    shadow-camera-right={6}
                    castShadow
                />
                <OrbitControls />
                <Physics defaultContactMaterial={{ contactEquationStiffness: 1e2 }}>
                    <Suspense fallback={<HTML>Loading...</HTML>}>
                        <Text position={[0, 0, -2]} font={revue} letterSpacing={-0.02} color='rgba(0, 10, 4)' rotation={[-0.5 * Math.PI, 0, 0]} fontSize={2}>Yahtzee</Text>
                        <ScoreSheet />
                        <Button />
                        <Ground />
                        <Plate />
                        <Pencil />
                        {dices.map(dice => <Dice key={dice.id} dice={dice} />)}
                    </Suspense>
                </Physics>
            </Canvas>
        </>
    )
}

