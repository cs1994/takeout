/**
 * Created by jiye on 16/3/15.
 */
import React, { Component } from 'react'

export default class TopHeader extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img src="/facew/assets/images/manage/index/pchome2.png" alt="brand picture"/>
                        </a>
                    </div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a href="#" className="nav-link active">首页管理</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">商城管理</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">超市管理</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">优惠券管理</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">酒店公寓</a>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="javascript:;">用户名</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">退出</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}