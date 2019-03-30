const initialState = {
    data: [],
    isLoading: false
}

export default types = (state = initialState, action) => {
    switch(action.type){
        case 'GET_TYPES_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_TYPES_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_TYPES_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        
        case 'ADD_TYPE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'ADD_TYPE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'ADD_TYPE_FULFILLED':
            state.data.push(action.payload.data);
            return{
                ...state,
                isLoading: false,
                data: state.data
            }

        case 'EDIT_TYPE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'EDIT_TYPE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'EDIT_TYPE_FULFILLED':
            const newTypeAfterUpdate = state.data.map(type => {
                if(type.id == action.payload.data.id){
                    return action.payload.data;
                }

                return type;
            })
            return{
                ...state,
                isLoading: false,
                data: newTypeAfterUpdate
            }
        
        case 'DELETE_TYPE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'DELETE_TYPE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_TYPE_FULFILLED':
            const newTypeAfterDelete = state.data.filter(type => type.id != action.payload.data.id)
            return{
                ...state,
                isLoading: false,
                data: newTypeAfterDelete
            }

        default:
            return state;
    }
}