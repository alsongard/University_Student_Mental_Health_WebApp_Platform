const initializedState = {
    isLoggedIn: false // default value for isLoggedIn which will be udpated based on action
};

const reducerer = (state=initializedState, action:any)=>{
    switch (action.type)
    {
        case 'ON_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true
            } 
        case 'ON_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false
            }
    }
    return state
};

export default reducerer;