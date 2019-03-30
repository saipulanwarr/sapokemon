const initialState = {
    data: [],
    detail: [],
    isLoading: false
}

export default pokemon = (state = initialState, action) => {
    switch(action.type){
        case 'GET_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_POKEMON_FULFILLED':
            if(state.data == ""){
                state.data = action.payload.data
            }else{
                if(action.payload.data.page == 1){
                    state.data = action.payload.data
                }else{
                    state.data.page = action.payload.data.page;
                    action.payload.data.data.map(newData => {
                        state.data.data.push(newData);
                    })
                }
            }

            return{
                isLoading: false,
                data: state.data
            }

        case 'ADD_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'ADD_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'ADD_POKEMON_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        case 'EDIT_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'EDIT_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'EDIT_POKEMON_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'DELETE_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_POKEMON_FULFILLED':
            const newPokemonAfterDelete = state.data.data.filter(edu => edu.id != action.payload.data.id)
            return{
                ...state,
                isLoading: false,
                data: newPokemonAfterDelete
            }

        case 'DETAIL_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'DETAIL_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DETAIL_POKEMON_FULFILLED':
            return{
                ...state,
                isLoading: false,
                detail: action.payload.data
            }

        case 'SEARCH_POKEMON_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'SEARCH_POKEMON_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'SEARCH_POKEMON_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}