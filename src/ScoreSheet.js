import React, { useState } from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import { useScore, useStore } from './store'
import pencilSFX from './assets/pencil.mp3'
import useSound from 'use-sound'
import { useSpring, a } from 'react-spring'

const ScoreSheet = () => {
    const { possibleScores, currentScores, totalScores } = useScore()
    return (
        <Grid style={{
            position: 'absolute',
            top: '0%',
            marginTop: 210,
            marginLeft: 0,
            height: '900px',
            width: '500px',
            perspective: '3000px',
            perspectiveOrigin: "50% 50%",
            transform: 'scale(1.2)',
        }} container>
            <Card elevation={0} square style={{
                width: '60%',
                backgroundColor: 'rgba(0,0,0,0)',
                // backgroundImage: `url(${paper})`,
                transform: "translate3d(-50%, -50%, 0) rotate3d(1, 0, 0, 30deg) rotate3d(0, 0, 1, -0deg) rotateY(-3deg)"
            }}>
                <CardContent style={{ transform: 'rotateZ(2deg) translateX(20px)' }}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4>Upper section</h4>
                            </Grid>
                            <Grid item xs={3}>
                                <h4>Score</h4>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>

                        <Upper totalScores={totalScores} possibleScores={possibleScores} currentScores={currentScores} />

                        <Grid container>
                            <h4>Lower section</h4>
                        </Grid>

                        <Lower totalScores={totalScores} possibleScores={possibleScores} currentScores={currentScores} />

                    </Grid>

                </CardContent>
            </Card>
        </Grid >
    )
}

function Upper({ possibleScores, currentScores, totalScores }) {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <p>Aces</p>
                </Grid>
                <ScoreCell name='aces' currentScore={currentScores.aces} possibleScore={possibleScores.aces} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Twos</p>
                </Grid>
                <ScoreCell name='twos' currentScore={currentScores.twos} possibleScore={possibleScores.twos} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Threes</p>
                </Grid>
                <ScoreCell name='threes' currentScore={currentScores.threes} possibleScore={possibleScores.threes} />
            </Grid >
            <Grid container>
                <Grid item xs={6}>
                    <p>Fours</p>
                </Grid>
                <ScoreCell name='fours' currentScore={currentScores.fours} possibleScore={possibleScores.fours} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Fives</p>
                </Grid>
                <ScoreCell name='fives' currentScore={currentScores.fives} possibleScore={possibleScores.fives} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Sixes</p>
                </Grid>
                <ScoreCell name='sixes' currentScore={currentScores.sixes} possibleScore={possibleScores.sixes} />
            </Grid>


            <Grid style={{ marginTop: 20 }} container>
                <Grid item xs={6}>
                    <p>Bonus</p>
                </Grid>
                <Grid item xs={2}>
                    <p style={{ fontWeight: 'bold', zIndex: 5, textAlign: 'center', margin: 0 }}>{totalScores?.bonus}</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Sum</p>
                </Grid>
                <Grid item xs={2}>
                    <p style={{ fontWeight: 'bold', zIndex: 5, textAlign: 'center', margin: 0 }}>{totalScores?.totalUpper}</p>
                </Grid>
            </Grid>
        </>
    )
}

function Lower({ possibleScores, currentScores, totalScores }) {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <p>3 of a kind</p>
                </Grid>
                <ScoreCell name='threeOfAKind' currentScore={currentScores.threeOfAKind} possibleScore={possibleScores.threeOfAKind} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>4 of a kind</p>
                </Grid>
                <ScoreCell name='fourOfAKind' currentScore={currentScores.fourOfAKind} possibleScore={possibleScores.fourOfAKind} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Full House</p>
                </Grid>
                <ScoreCell name='fullHouse' currentScore={currentScores.fullHouse} possibleScore={possibleScores.fullHouse} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Small Straight</p>
                </Grid>
                <ScoreCell name='smallStraight' currentScore={currentScores.smallStraight} possibleScore={possibleScores.smallStraight} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Large Straight</p>
                </Grid>
                <ScoreCell name='largeStraight' currentScore={currentScores.largeStraight} possibleScore={possibleScores.largeStraight} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Yahtzee!</p>
                </Grid>
                <ScoreCell name='yahtzee' currentScore={currentScores.yahtzee} possibleScore={possibleScores.yahtzee} />
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Chance</p>
                </Grid>
                <ScoreCell name='chance' currentScore={currentScores.chance} possibleScore={possibleScores.chance} />
            </Grid>

            <Grid style={{ marginTop: 20 }} container>
                <Grid item xs={6}>
                    <p>Total</p>
                </Grid>
                <Grid item xs={2}>
                    <p style={{ fontWeight: 'bold', zIndex: 5, textAlign: 'center', margin: 0 }}>{totalScores?.total}</p>
                </Grid>
            </Grid>
        </>
    )
}

function ScoreCell({ possibleScore, currentScore, name }) {
    let { setCurrentScore, setPossibleScores, setScoreCount, scoreCount } = useScore()
    const { resetRound, setPossibleScoresCalculation, possibleScoresCalculation } = useStore()
    const [play] = useSound(pencilSFX, { volume: 0.5 })
    const [hover, set] = useState(false)
    const props = useSpring({
        backgroundColor: hover ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)',
        cursor: 'pointer',
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: '20px'
    })

    return currentScore === null ?
        <Grid onMouseOver={() => set(true)} onMouseLeave={() => set(false)} item xs={2}>
            <a.div onClick={() => {
                if (possibleScoresCalculation) {
                    if (possibleScore) setCurrentScore(possibleScore, name)
                    else setCurrentScore('x', name)
                    resetRound(setPossibleScores)
                    play()
                    setPossibleScoresCalculation(false)
                    setScoreCount(scoreCount += 1)
                }
            }} style={props}>
                <p style={{ color: ' red', zIndex: 5, textAlign: 'center', margin: 0 }}>{possibleScore ? possibleScore : ''}</p>
            </a.div>
        </Grid >
        :
        <Grid onMouseOver={() => set(true)} onMouseLeave={() => set(false)} item xs={2}>
            <a.div style={props}>
                <p style={{ fontWeight: 'bold', zIndex: 5, textAlign: 'center', margin: 0 }}>{currentScore}</p>
            </a.div>
        </Grid>
}

export default ScoreSheet
