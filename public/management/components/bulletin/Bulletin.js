/**
 * Created by caoshuai on 2016/3/20.
 */
import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'
export default class Bulletin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch} = this.props;

        return (
            <div className="pageheader">
                <h2><i className="fa fa-tachometer"></i> 快报管理</h2>
                {React.cloneElement(this.props.children,{
                    dispatch
                })}
            </div>
        );
    }
}
Bulletin.propTypes = {
    //bulletinList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getBulletin(state){
    return{}
}
export default connect(getBulletin)(Bulletin)