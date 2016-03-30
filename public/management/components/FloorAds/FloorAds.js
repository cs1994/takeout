/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'

export default class FlooAds extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { dispatch} = this.props;
        return (
            <div className="pageheader">
                <h2><i className="fa fa-tachometer"></i> 广告楼层管理</h2>
                {React.cloneElement(this.props.children,{
                    dispatch
                })}
            </div>
        );
    }
}
FlooAds.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function getFlooAds(state){
    return{}
}
export default connect(getFlooAds)(FlooAds)