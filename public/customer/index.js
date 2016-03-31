/**
 * Created by caoshuai on 2016/3/31.
 */

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App.js'
import manageApp from './reducers/reducers'
import manageStore from './store/store.js'

const store = manageStore();

let rootElement = document.getElementById('manage');
render(
    <Provider store = {store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/bulletin" component={Bulletin}>
                    <IndexRoute component={BulletinManage}/>
                    <Route path="/publish" component={BulletinPublish}/>
                </Route>
                <Route path="/qrcode" component={QrCodeContent}/>
                <Route path="/classify" component={Classify}>
                    <IndexRoute component={ShowClassify}/>
                    <Route path="/newclassify" component={NewClassify}/>
                </Route>
                <Route path="/floorads" component={FloorAds}>
                    <IndexRoute  component={AdsShow}/>
                    <Route path="/addadvertisement" component={AddAdver}/>
                </Route>
                <Route path="/recommend" component={Recommend}></Route>
                <Route path="/carousel/upload" component={CarouselUpload}></Route>
                <IndexRoute component={SliderContent}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);