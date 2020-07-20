export const LoginReducer = (state = JSON.parse(localStorage.getItem('LoginUser')) || false, action) => {
    switch (action.type) {
        case 'Login_user':
            return state = true
        default:
            return state;
    }
}