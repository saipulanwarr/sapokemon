const initialState = {
    data: [],
    isLoading: false
}

export default register = (state = initialState, action) => {
    switch(action.type){
        case 'GET_REGISTER_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'GET_REGISTER_REJECTED':
            return{
                ...state,
                isLoading: false
            }
        
        case 'GET_REGISTER_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}