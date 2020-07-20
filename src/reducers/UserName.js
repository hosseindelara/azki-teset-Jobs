export const usenameReducer = (state = JSON.parse(localStorage.getItem('username')) || "", acions) => {
    switch (acions.type) {
        case "login":
            return acions.paylod
        default:
            return state
    }
}