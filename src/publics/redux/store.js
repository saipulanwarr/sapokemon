import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger({});

import reducers from './reducers';

const store = createStore(
    reducers,
    applyMiddleware(
        logger,
        promiseMiddleware
    )
);

export default store;