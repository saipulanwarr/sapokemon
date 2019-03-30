import axios from 'axios';

export const login = (body) => {
    return{
        type: 'GET_LOGIN',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3331/api/v1/login',
            data: body
        })
    }
}