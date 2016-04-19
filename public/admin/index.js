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
import StoreUserList from './components/StoreUserList.js'
import AddRestaurant from './components/AddRestaurant.js'
import RestaurantList from './components/RestaurantList.js'
import ClassifyShow from './components/ClassifyShow.js'

const store = manageStore();

let rootElement = document.getElementById('App');
render(
    <Provider store = {store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={StoreUserList}/>
                <Route path="/restaurant/add" component={AddRestaurant}/>
                <Route path="/restaurant/list" component={RestaurantList}/>
                <Route path="/classify" component={ClassifyShow}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);