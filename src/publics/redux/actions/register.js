import axios from 'axios';

export const register = (body) => {
    return{
        type: 'GET_REGISTER',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3331/api/v1/register',
            data: body
        })
    }
}