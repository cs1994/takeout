/**
 * Created by caoshuai on 2016/4/10.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import Modal from '../../../javascripts/common/modal.js'
import {isEmail,isStrongPassword} from "../../../javascripts/common/function.js"
/**
 * 餐厅主人列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class RestaurantList extends Component{
    constructor(props) {
        super(props);
        this.openModal=this.openModal.bind(this);
        this.onConfirm=this.onConfirm.bind(this);
        this.checkEmail=this.checkEmail.bind(this);
        this.onCheckPwd=this.onCheckPwd.bind(this);
    }
    componentWillMount(){
    }
    openModal(){
        this.refs.addStoreUser.open();
    }
    onConfirm(){
        var email = $('#email').val();
        var password = $('#password').val();
        var secondPwd = $('#secondPwd').val();

        if(!isEmail(email)){
            toastr.warning("邮箱格式不正确");
            return;
        }

        if(password != secondPwd){
            toastr.warning("两次密码输入不一致");
            return;
        }else if(!isStrongPassword(password)){
            toastr.warning("密码格式不正确");
            return;
        }
        var postData = {email: email, password: password};
        console.log("$$$$ " + JSON.stringify(postData))
    }
    checkEmail(){
        var email = $('#email').val();
        if(!isEmail(email)){
            toastr.warning("邮箱格式不正确");
        }
    }
    onCheckPwd(){
        var pwd = $('#password').val();
        if(!isStrongPassword(pwd)){
            toastr.warning("密码格式不正确");
        }
    }
    render(){
        const {storeUserList} = this.props;
        return(
            <div id="ShanghuManagerHome" style={{marginTop:"20px"}}>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-success" onClick={this.openModal}>
                            <i className="fa fa-plus"></i>添加商户
                        </button>
                    </div>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-striped table-condensed">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>邮箱</th>
                                    <th>名称</th>
                                    <th>状态</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                //    this.state.ShanghuManagerStore.shanghuList.map(function(e, index){
                                //    //{"id":100004,"email":"shaotianjie@ebupt.com","nickName":"shaotianjie@ebupt.com",
                                //    // "headImg":"/public/images/defaultHead.jpg","state":1,"userType":2,
                                //    // "createTime":1451888387294}
                                //    var stateBtnDom = null;
                                //    if(e.state == 0){
                                //        stateBtnDom = <button className="btn btn-success btn-sm" onClick={this.handleClickChangeState.bind(this, e.id, 1)}>启用</button>;
                                //    }else if(e.state == 1){
                                //        stateBtnDom = <button className="btn btn-warning btn-sm" onClick={this.handleClickChangeState.bind(this, e.id, 0)}>禁用</button>;
                                //    }
                                //    return(
                                //        <tr key={e.id}>
                                //            <td>{e.id}</td>
                                //            <td>{e.email}</td>
                                //            <td>{e.nickName}</td>
                                //            <td>{e.state == 1 ? "已启用" : "已禁用"}</td>
                                //            <td>{RheaUtil.timeFormat(e.createTime)}</td>
                                //            <td>
                                //                <button className="btn btn-info btn-sm" onClick={this.handleClickAddRestaurant.bind(this, e.id)}>开餐厅</button>&nbsp;&nbsp;
                                //                {/*<button className="btn btn-info btn-sm" onClick={this.handleClickAddMall.bind(this, e.id)}>开商铺</button>&nbsp;&nbsp;*/}
                                //                <button className="btn btn-primary btn-sm" onClick={this.handleClickAddStore.bind(this, e.id)}>开店</button>&nbsp;&nbsp;
                                //                <button className="btn btn-danger btn-sm" onClick={this.handleRemove.bind(this, e.id)}>删除</button>&nbsp;&nbsp;
                                //                <button className="btn btn-warning btn-sm" onClick={this.handleResetPwd.bind(this, e.id)}>重置密码</button>&nbsp;&nbsp;
                                //                {stateBtnDom}
                                //            </td>
                                //        </tr>
                                //    )
                                //}.bind(this))
                                }


                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div id="pagination"></div>
                    </div>
                </div>
                <Modal ref="addStoreUser" title="添加商户" Id="addStoreUser" onConfirm={this.onConfirm}>
                    <form id="newDishForm">
                        <fieldset>
                            <div id="legend" className="">
                                <legend className="">新建商户</legend>
                            </div>
                            <div className="form-group">
                                <label for="dishName"> 邮箱(必填)</label>
                                <input type="email" className="form-control" id="email"
                                       name="email" placeholder="" onBlur={this.checkEmail}/>
                                <p className="help-block">此邮箱将作为商户登录的邮箱</p>

                            </div>
                            <div className="form-group">
                                <label for="dishName"> 密码(必填,强密码)</label>
                                <input type="password" className="form-control" id="password"
                                       name="password" placeholder="" onBlur={this.onCheckPwd}/>
                                <p className="help-block">必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20之间</p>

                            </div>
                            <div className="form-group">
                                <label for="dishName"> 确认密码(必填)</label>
                                <input type="password" className="form-control" id="secondPwd"
                                       name="secondPwd" placeholder=""/>
                                <p className="help-block"></p>
                            </div>
                        </fieldset>
                    </form>

                </Modal>
            </div>

        )
    }
}
RestaurantList.contextTypes = contextTypes;
RestaurantList.propTypes = {
    storeUserList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        storeUserList: state.storeUserList?state.storeUserList:[]
    }
}
export default connect(getRestaurantList)(RestaurantList)