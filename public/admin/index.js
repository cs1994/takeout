/**
 * Created by caoshuai on 2016/4/10.
 */

import "babel-polyfill"
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App.js'
import manageStore from './store/store.js'
import StoreUserList from './components/storeUser/StoreUserList.js'

const store = manageStore();

let rootElement = document.getElementById('App');
render(
    <Provider store = {store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={StoreUserList}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);