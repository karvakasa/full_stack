export const anecdoteVote = (text) => {
    console.log(text)
    return {
        type: 'SET_MESSAGE',
        data: {
            content: text
        }
    }
}
export const clearNotification = () => {
    return {
        type: 'EMPTY_MESSAGE'
    }
}
const notificationReducer = (state = null, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SET_MESSAGE':
            state = `you voted '${action.text}'`
            return action.text
        case 'EMPTY_MESSAGE':
            state = null
            return state
        default:
            return state
    }
}
export default notificationReducer