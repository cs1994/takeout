/**
 * Created by caoshuai on 2016/3/31.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export default class App extends Component {
    componentDidMount() {
    }
    render() {
        // Injected by connect() call:
        const { dispatch} = this.props;
        return (
            <div className="indexPage">
                <div className="indexBg"></div>
                <div className="pBox">

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
    dispatch: PropTypes.func.isRequired
};


export default connect()(App)