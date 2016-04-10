/**
 * Created by caoshuai on 2016/4/10.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ShanghuHeader from '../components/storeUser/ShanghuHeader.js'

export default class App extends Component {
    componentDidMount() {
    }
    render() {
        const { dispatch} = this.props;
        return (
            <div className="indexPage">
                <ShanghuHeader />
                <div>

                    {React.cloneElement(this.props.children,{
                        dispatch
                    })}
                </div>
            </div>
        )
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect()(App)