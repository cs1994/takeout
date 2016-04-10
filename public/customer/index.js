/**
 * Created by caoshuai on 2016/3/31.
 */

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App.js'
//import manageApp from './reducers/reducers'
import manageStore from './store/store.js'
import HomePage from './components/HomePage/HomePage.js'

const store = manageStore();

let rootElement = document.getElementById('App');
render(
    <Provider store = {store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);