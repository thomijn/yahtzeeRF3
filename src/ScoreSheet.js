import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'

const ScoreSheet = () => {
    return (
        <Grid style={{ position: 'absolute', top: '0%', marginTop: 200, marginLeft: 100, width: '20%' }} container>
            <Card style={{ width: '100%' }}>
                <CardContent>
                    <Grid item xs={12}>
                        <h1>Yahtzee</h1>
                    </Grid>

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

                        <Upper />

                        <Grid container>
                            <h4>Lower section</h4>
                        </Grid>

                        <Lower />

                    </Grid>

                </CardContent>
            </Card>
        </Grid>
    )
}

function Upper() {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <p>Aces</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Twos</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Threes</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <p>Fours</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Fives</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Sixes</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>
        </>
    )
}

function Lower() {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <p>3 of a kind</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>4 of a kind</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Full House</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Small Straight</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Large Straight</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Yahtzee!</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6}>
                    <p>Chance</p>
                </Grid>
                <Grid item xs={1}>
                    <p>6</p>
                </Grid>
            </Grid>
        </>
    )
}

export default ScoreSheet
