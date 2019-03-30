import axios from 'axios';

export const getUser = (token) => {
    return{
        type: 'GET_USER',
        payload: axios.get('http://167.99.71.164:3331/api/v1/profile', { headers: { "Authorization": `Bearer ${token}` } })
    }
}