import axios from 'axios';

export const addTypesPokemon = (body) => {
    return{
        type: 'ADD_TYPESPOKEMON',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3331/api/v1/typespokemon',
            data: body
        })
    }
}