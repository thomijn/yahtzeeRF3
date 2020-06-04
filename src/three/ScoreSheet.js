import React, { useState, useEffect } from 'react'
import { Text, Plane } from 'drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useScore, useStore } from '../store'
import useSound from 'use-sound'
import pencilSFX from '../assets/pencil.mp3'

const ScoreSheet = () => {
    const { possibleScores, currentScores, totalScores } = useScore()
    console.log(typeof possibleScores.fives)
    return (
        <group position={[0, 0, -0.2]}>
            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -3]} fontSize={0.2} color='black' >Upper Section</Text>

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -2.6]} fontSize={0.2} color='black' >Aces</Text>
            <ScoreCell positionText={[-3, 0.22, -2.6]} positionPlane={[-2.89, 0.2, -2.5]} name='aces' currentScore={currentScores.aces} possibleScore={possibleScores.aces} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -2.3]} fontSize={0.2} color='black' >Twos</Text>
            <ScoreCell positionText={[-3, 0.22, -2.3]} positionPlane={[-2.89, 0.2, -2.2]} name='twos' currentScore={currentScores.twos} possibleScore={possibleScores.twos} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -2.0]} fontSize={0.2} color='black' >Threes</Text>
            <ScoreCell positionText={[-3, 0.22, -2.0]} positionPlane={[-2.89, 0.2, -1.9]} name='threes' currentScore={currentScores.threes} possibleScore={possibleScores.threes} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -1.7]} fontSize={0.2} color='black' >Fours</Text>
            <ScoreCell positionText={[-3, 0.22, -1.7]} positionPlane={[-2.89, 0.2, -1.6]} name='fours' currentScore={currentScores.fours} possibleScore={possibleScores.fours} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -1.4]} fontSize={0.2} color='black' >Fives</Text>
            <ScoreCell positionText={[-3, 0.22, -1.4]} positionPlane={[-2.89, 0.2, -1.3]} name='fives' currentScore={currentScores.fives} possibleScore={possibleScores.fives} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -1.1]} fontSize={0.2} color='black' >Sixes</Text>
            <ScoreCell positionText={[-3, 0.22, -1.1]} positionPlane={[-2.89, 0.2, -1.0]} name='sixes' currentScore={currentScores.sixes} possibleScore={possibleScores.sixes} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -0.7]} fontSize={0.2} color='black' >Bonus</Text>
            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-3, 0.22, -0.7]} fontSize={0.2} color='black' >{totalScores.bonus}</Text>

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, -0.4]} fontSize={0.2} color='black' >Sum</Text>
            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-3, 0.22, -0.4]} fontSize={0.2} color='black' >{totalScores.totalUpper}</Text>


            {/* --------------------------------------------------------------------------------------------------- */}


            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 0]} fontSize={0.2} color='black' >Lower Section</Text>

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 0.4]} fontSize={0.2} color='black' >Three Of a Kind</Text>
            <ScoreCell positionText={[-3, 0.22, 0.4]} positionPlane={[-2.89, 0.2, 0.5]} name='threeOfAKind' currentScore={currentScores.threeOfAKind} possibleScore={possibleScores.threeOfAKind} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 0.7]} fontSize={0.2} color='black' >Four Of a Kind</Text>
            <ScoreCell positionText={[-3, 0.22, 0.7]} positionPlane={[-2.89, 0.2, 0.8]} name='fourOfAKind' currentScore={currentScores.fourOfAKind} possibleScore={possibleScores.fourOfAKind} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 1]} fontSize={0.2} color='black' >Full House</Text>
            <ScoreCell positionText={[-3, 0.22, 1]} positionPlane={[-2.89, 0.2, 1.1]} name='fullHouse' currentScore={currentScores.fullHouse} possibleScore={possibleScores.fullHouse} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 1.3]} fontSize={0.2} color='black' >Small Straight</Text>
            <ScoreCell positionText={[-3, 0.22, 1.3]} positionPlane={[-2.89, 0.2, 1.4]} name='smallStraight' currentScore={currentScores.smallStraight} possibleScore={possibleScores.smallStraight} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 1.6]} fontSize={0.2} color='black' >Large Straight</Text>
            <ScoreCell positionText={[-3, 0.22, 1.6]} positionPlane={[-2.89, 0.2, 1.7]} name='largeStraight' currentScore={currentScores.largeStraight} possibleScore={possibleScores.largeStraight} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 1.9]} fontSize={0.2} color='black' >Yahtzee!</Text>
            <ScoreCell positionText={[-3, 0.22, 1.9]} positionPlane={[-2.89, 0.2, 2.0]} name='yahtzee' currentScore={currentScores.yahtzee} possibleScore={possibleScores.yahtzee} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 2.2]} fontSize={0.2} color='black' >Chance</Text>
            <ScoreCell positionText={[-3, 0.22, 2.2]} positionPlane={[-2.89, 0.2, 2.3]} name='chance' currentScore={currentScores.chance} possibleScore={possibleScores.chance} />

            <Text rotation={[-0.5 * Math.PI, 0, 0]} position={[-5.3, 0.22, 2.6]} fontSize={0.2} color='black' >Total</Text>
            <Text re maxWidth={400} rotation={[-0.5 * Math.PI, 0, 0]} position={[-3, 0.22, 2.6]} fontSize={0.2} color='black' >{totalScores.total}  </Text>
        </group>
    )
}

function ScoreCell({ name, possibleScore, currentScore, positionText, positionPlane }) {
    const [hover, set] = useState(false)
    let { setCurrentScore, setPossibleScores, setScoreCount, scoreCount } = useScore()
    const { resetRound, setPossibleScoresCalculation, possibleScoresCalculation } = useStore()
    const [play] = useSound(pencilSFX, { volume: 0.5 })

    useEffect(() => {
        document.body.style.cursor = hover ? 'pointer' : 'auto'
    })

    const props = useSpring({
        color: hover ? '#b0aeae' : '#fff',
    })

    return (
        <>
            <Plane onPointerOver={() => set(true)} onPointerOut={() => set(false)} onClick={() => {
                if (possibleScoresCalculation) {
                    if (possibleScore) setCurrentScore(possibleScore, name)
                    else setCurrentScore('x', name)
                    resetRound(setPossibleScores)
                    play()
                    setPossibleScoresCalculation(false)
                    setScoreCount(scoreCount += 1)
                }
            }} rotation={[-0.5 * Math.PI, 0, 0]} position={positionPlane} args={[0.3, 0.3]} >
                <a.meshPhysicalMaterial attach='material' color={props.color} />
            </Plane>
            {currentScore === null ?
                <Text rotation={[-0.5 * Math.PI, 0, 0]} position={positionText} fontSize={0.2} color='red' >{possibleScore && possibleScore.toString()} </Text>

                :
                <Text rotation={[-0.5 * Math.PI, 0, 0]} position={positionText} fontSize={0.2} color='black' >{currentScore.toString()} </Text>
            }
        </>
    )
}

export default ScoreSheet
