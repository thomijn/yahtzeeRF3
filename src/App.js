import React, { Suspense, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core'
import { useStore, useScore } from './store';
import { calculatePossibleScores, calculateTotal, gameEnd } from './gamefunctions/calculateScores';
import Canvas from './three/Canvas';

function App() {
  let amountRolled = useStore(state => state.amountRolled)
  const setPossibleScores = useScore(state => state.setPossibleScores)

  const diceOne = useStore(state => state.diceOne)
  const diceTwo = useStore(state => state.diceTwo)
  const diceThree = useStore(state => state.diceThree)
  const diceFour = useStore(state => state.diceFour)
  const diceFive = useStore(state => state.diceFive)
  const setGamePhase = useStore(state => state.setGamePhase)
  const currentScores = useScore(state => state.currentScores)
  const possibleScoresCalculation = useStore(state => state.possibleScoresCalculation)
  const setTotalScores = useScore(state => state.setTotalScores)
  const scoreCount = useScore(state => state.scoreCount)

  useEffect(() => {
    const goodDices = [diceOne, diceTwo, diceThree, diceFour, diceFive]
    if (possibleScoresCalculation) setPossibleScores(calculatePossibleScores(goodDices))
    console.log(possibleScoresCalculation)
    setTotalScores(calculateTotal(currentScores))
    if (gameEnd(scoreCount)) setGamePhase('Restart')
  })

  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Canvas />
      </Suspense>
    </>
  )
}

export default App;
