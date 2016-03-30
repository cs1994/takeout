/**
 * Created by jiye on 16/3/15.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TopHeader from './../components/TopHeader.js'
import Sidebar from './../components/Sidebar.js'
import SliderContent from './../components/carousel/Content'
//import { fetchSliders} from '../actions/sliders/action.js'
//import { manageSlider } from '../reducers/reducers.js'

export default class App extends Component {
    componentDidMount() {
        //this.props.dispatch(getStoreList());
        //this.props.dispatch(fetchSliders());
    }
    render() {
        // Injected by connect() call:
        const { dispatch} = this.props;
        return (
            <div className="indexPage">
                <div className="indexBg"></div>
                <div className="pBox">
                    <TopHeader/>
                    <Sidebar/>
                    {React.cloneElement(this.props.children,{
                        dispatch
                    })}
                </div>
                <div className="mask"></div>
            </div>
        )
    }
}
App.propTypes = {
    //list:PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getInfomation(state) {
    return {}
}

export default connect(getInfomation)(App)