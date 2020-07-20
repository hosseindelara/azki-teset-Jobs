export const FromState = (state = JSON.parse(localStorage.getItem('stateForm')) || 1, action) => {
    switch (action.type) {
        case "next_form":
            return state + 1
        case "Prev_form":
            return state - 1
        case "reset":
            return localStorage.setItem('stateForm', JSON.stringify(action.paylod)) || action.paylod
        default:
            return state
    }
}