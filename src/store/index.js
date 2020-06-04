import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
// import rollSoundSFX from '../assets/dice.mp3'
// import clamp from "lodash-es/clamp"

const initial = {
    aces: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,

    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    largeStraight: 0,
    smallStraight: 0,
    yahtzee: 0,
    chance: 0,
}

const initialCurrent = {
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

export const [useScore] = create((set, get, ) => ({
    possibleScores: initial,
    currentScores: initialCurrent,
    scoreCount: 0,
    totalScores: undefined,
    setScoreCount: scoreCount => {
        set({ scoreCount: scoreCount })
    },
    setTotalScores: totalScores => {
        set({ totalScores: totalScores })
    },
    setPossibleScores: scores => {
        set({ possibleScores: scores })
    },
    setCurrentScores: scores => {
        set({ currentScores: scores })
    },
    setCurrentScore: (score, name) => {
        let currentScores = get().currentScores
        currentScores = {
            ...currentScores,
            [name]: score
        }
        set({ currentScores: currentScores })
    }
}))

// const rollSound = new Audio(rollSoundSFX)

export const [useStore, api] = create(
    devtools((set, get) => {
        return ({
            diceOne: undefined,
            diceTwo: undefined,
            diceThree: undefined,
            diceFour: undefined,
            diceFive: undefined,
            setDiceOne: value => set({ diceOne: value }),
            setDiceTwo: value => set({ diceTwo: value }),
            setDiceThree: value => set({ diceThree: value }),
            setDiceFour: value => set({ diceFour: value }),
            setDiceFive: value => set({ diceFive: value }),
            dices: [
                { id: 1, value: undefined, set: false, prev: undefined, api: undefined, name: 'diceOne' },
                { id: 2, value: undefined, set: false, prev: undefined, api: undefined, name: 'diceTwo' },
                { id: 3, value: undefined, set: false, prev: undefined, api: undefined, name: 'diceThree' },
                { id: 4, value: undefined, set: false, prev: undefined, api: undefined, name: 'diceFour' },
                { id: 5, value: undefined, set: false, prev: undefined, api: undefined, name: 'diceFive' }
            ],
            slots: [
                { id: 1, position: [-5, 0.25, 4], open: true },
                { id: 2, position: [-4, 0.25, 4], open: true },
                { id: 3, position: [-3, 0.25, 4], open: true },
                { id: 4, position: [-2, 0.25, 4], open: true },
                { id: 5, position: [-1, 0.25, 4], open: true },
            ],
            setDice: (index, bool) => {
                const dices = get().dices
                const newDices = dices.map((content, i) => i === index ? { ...content, set: bool } : content)
                set({ dices: newDices })
            },
            setSlot: (index, bool) => {
                const slots = get().slots
                const newSlots = slots.map((content, i) => i === index ? { ...content, open: bool } : content)
                set({ slots: newSlots })
            },
            api: {
                roll(velocity) {
                    // rollSound.currentTime = 0
                    // rollSound.volume = clamp(velocity / 20, 0, 1) + 0.1
                    // rollSound.play()
                }
            },
            amountRolled: 0,
            setAmountRolled: number => {
                set({ amountRolled: number })
            },
            startedGame: 0,
            setStartedGame: bool => {
                set({ startedGame: bool })
            },
            reroll: false,
            setReroll: bool => {
                set({ reroll: bool })
            },
            possibleScoresCalculation: false,
            setPossibleScoresCalculation: bool => {
                set({ possibleScoresCalculation: bool })
            },
            resetRound: (setPossibleScores) => {
                setPossibleScores(initial)
                set({ amountRolled: 0 })

                const dices = get().dices
                const slots = get().slots

                for (let i = 0; i < dices.length; i++) {
                    dices[i].set = false
                }

                for (let i = 0; i < slots.length; i++) {
                    slots[i].open = true
                }

                set({ dices: dices })
                set({ slots: slots })
            },
            setApi: (id, api) => {
                const dices = get().dices
                const newDices = dices.map((content) => content.id === id ? { ...content, api: api } : content)
                set({ dices: newDices })
            },
            gamePhase: 'Start',
            setGamePhase: phase => {
                set({ gamePhase: phase })
            },
        })
    }

    ))

