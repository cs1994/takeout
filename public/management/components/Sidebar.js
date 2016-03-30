/**
 * Created by jiye on 16/3/15.
 */
import React, { Component } from 'react'

export default class Sidebar extends Component {
    //contextTypes: {
    //    router: React.PropTypes.object
    //    },

    render() {
        return (
            <ul className="nav navbar-nav side-nav" id="sidebar" tabIndex="5000" style={{zIndex:"1000"}}>
                <li className="navigation" id="navigation">
                    <a href="#" className="sidebar-toggle" data-toggle="#navigation">Navigation <i className="fa fa-angle-up"></i></a>
                    <ul className="menu">
                        <li className="active">
                            <a href="#">轮播图管理</a>
                            <a href="/facew/manage#/bulletin">快报管理</a>
                            <a href="/facew/manage#/classify">分类管理</a>
                            <a href="/facew/manage#/floorads">广告楼层管理</a>
                            <a href="/facew/manage#/qrcode">二维码管理</a>
                            <a href="/facew/manage#/recommend">商家推荐管理</a>
                            <a href="#">底部管理</a>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}