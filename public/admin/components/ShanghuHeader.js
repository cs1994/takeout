/**
 * Created by caoshuai on 2016/4/10.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'

export default class ShanghuHeader extends Component {

    render() {

        return (
            <header>
                <nav className="navbar navbar-light bg-faded" style={{padding:"10px 40px"}}>
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img src="/assets/images/brand.png" alt="brand picture"/>
                        </a>
                    </div>

                    <div className="collapse navbar-toggleable-xs" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav pull-left">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">商户</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">用户</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">餐厅</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/takeout/admin#/classify">分类</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav pull-right">
                            <li className="nav-item">
                                <a className="nav-link" href="#">{$CONF$.nickName || $CONF$.email}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">退出</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                </header>
        )

    }
}