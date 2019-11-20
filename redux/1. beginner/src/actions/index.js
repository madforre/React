export const increment = (number) => {
    return { // return object actions.
        type: 'INCREMENT',
        payload: number
    };
}

export const decrement = () => {
    return {
        type: 'DECREMENT',
    }
}