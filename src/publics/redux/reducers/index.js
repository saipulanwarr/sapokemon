import { combineReducers } from 'redux';

import pokemon from './pokemon';
import login from './login';
import user from './user';
import register from './register';
import category from './category';
import types from './types';
import typespokemon from './typespokemon';

const appReducer = combineReducers({
    pokemon,
    login,
    user,
    register,
    category,
    types,
    typespokemon
});

export default appReducer;