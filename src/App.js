import React, { lazy, Suspense } from 'react';
import { Grid, Button } from '@material-ui/core'
import { useStore } from './store';
import ScoreSheet from './ScoreSheet';
const Canvas = lazy(() => import("./Canvas"))

function App() {
  let { setReroll, amountRolled, setAmountRolled, dices } = useStore()
  console.log(dices)
  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Canvas />
      </Suspense>

      <ScoreSheet />

      {/* <div className='parent'>
        <div className='title'>
          <h1>okee</h1>
          <p>enen</p>
        </div>
      </div> */}

      <Grid style={{ position: 'absolute', bottom: 100, right: 100, width: '400px' }}>
        <Button disabled={amountRolled === 2} onClick={() => {
          setReroll(true)
          setAmountRolled(amountRolled += 1)
        }} fullWidth variant='contained'>
          Reroll
        </Button>
      </Grid>

    </>
  )
}

export default App;
