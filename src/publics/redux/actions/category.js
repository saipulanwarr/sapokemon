import axios from 'axios';

export const getCategory = () => {
    return{
        type: 'GET_CATEGORY',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3331/api/v1/categories'
        })
    }
}