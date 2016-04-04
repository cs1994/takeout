import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import manageApp from '../reducers/reducers.js'

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

export default function manageStore(initialState) {
    return createStoreWithMiddleware(manageApp, initialState)
}
