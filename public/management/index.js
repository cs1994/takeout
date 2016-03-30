/**
 * Created by jiye on 16/3/15.
 */

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import App from './containers/App'
import App from './containers/Index'
import SliderContent from './components/carousel/Content.js'
import CarouselUpload from './components/carousel/CarouselUpload.js'
import BulletinManage from './components/bulletin/BulletinManage.js'
import Bulletin from './components/bulletin/Bulletin.js'
import BulletinPublish from './components/bulletin/BulletinPublish.js'
import QrCodeContent from './components/qrCode/qrCode.js'
import Classify from './components/classify/Classify.js'
import ShowClassify from './components/classify/ShowClassify.js'
import NewClassify from './components/classify/NewClassify.js'
import FloorAds from './components/FloorAds/FloorAds.js'
import AdsShow from './components/FloorAds/AdsShow.js'
import AddAdver from './components/FloorAds/AddAdver.js'
import Recommend from './components/recommend/Recommend.js'

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