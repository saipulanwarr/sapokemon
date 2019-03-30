import axios from 'axios';

export const getPokemon = (page, perPage) => {
    return{
        type: 'GET_POKEMON',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3331/api/v1/pokemon?page=${page}&perPage=${perPage}`,
        })
    }
}

export const addPokemon = (body) => {
    return{
        type: 'ADD_POKEMON',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3331/api/v1/pokemon',
            data: body
        })
    }
}

export const detailPokemon = (id) => {
    return{
        type: 'DETAIL_POKEMON',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3331/api/v1/pokemon/${id}`
        })
    }
}

export const editPokemon = (id, body) => {
    return{
        type: 'EDIT_POKEMON',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3331/api/v1/pokemon/${id}`,
            data: body
        })
    }
}

export const deletePokemon = (body) => {
    return{
        type: 'DELETE_POKEMON',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3331/api/v1/pokemon/${body.id}`
        })
    }
}

export const searchPokemon = (search) => {
    return{
        type: 'SEARCH_POKEMON',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3331/api/v1/pokemon?search=${search}`,
        })
    }
}