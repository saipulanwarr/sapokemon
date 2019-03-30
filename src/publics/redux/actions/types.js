import axios from 'axios';

export const getTypes = () => {
    return{
        type: 'GET_TYPES',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3331/api/v1/types'
        })
    }
}

export const addType = (body) => {
    return{
        type: 'ADD_TYPE',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3331/api/v1/type',
            data: body
        })
    }
}

export const editType = (id, body) => {
    return{
        type: 'EDIT_TYPE',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3331/api/v1/type/${id}`,
            data: body
        })
    }
}

export const deleteType = (body) => {
    return{
        type: 'DELETE_TYPE',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3331/api/v1/type/${body.id}`
        })
    }
}