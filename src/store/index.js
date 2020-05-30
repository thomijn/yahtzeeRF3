import { create } from 'zustand'

export const [useStore] = create((set, get) => ({
    dices: [
        { id: 1, value: undefined, set: false, prev: undefined },
        { id: 2, value: undefined, set: false, prev: undefined },
        { id: 3, value: undefined, set: false, prev: undefined },
        { id: 4, value: undefined, set: false, prev: undefined },
        { id: 5, value: undefined, set: false, prev: undefined }
    ],
    slots: [
        { id: 1, position: [-2, 0.2, 1.5], open: true },
        { id: 2, position: [-1.5, 0.2, 1.5], open: true },
        { id: 3, position: [-1, 0.2, 1.5], open: true },
        { id: 4, position: [-0.5, 0.2, 1.5], open: true },
        { id: 5, position: [-0, 0.2, 1.5], open: true },
    ],
    setDice: (index, bool) => {
        const dices = get().dices
        const newDices = dices.map((content, i) => i === index ? { ...content, set: bool } : content)
        set({ dices: newDices })
    },
    setDicesNumber: (id, value) => {
        const dices = get().dices
        const newDices = dices.map((content) => content.id === id ? { ...content, value: value } : content)
        set({ dices: newDices })
    },

    setSlot: (index, bool) => {
        const slots = get().slots
        const newSlots = slots.map((content, i) => i === index ? { ...content, open: bool } : content)
        set({ slots: newSlots })
    },

    reroll: false,
    amountRolled: 0,
    setAmountRolled: number => {
        set({ amountRolled: number })
    },
    setReroll: bool => {
        set({ reroll: bool })
    }
}))

export const [useScore] = create((set, get) => ({

}))