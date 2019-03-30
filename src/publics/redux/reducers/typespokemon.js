const initialState = {
    data: [],
    isLoading: false
}

export default types = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TYPESPOKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'ADD_TYPESPOKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'ADD_TYPESPOKEMON_FULFILLED':
            state.data.push(action.payload.data);
            return{
                ...state,
                isLoading: false,
                data: state.data
            }

        default:
            return state;
    }
}