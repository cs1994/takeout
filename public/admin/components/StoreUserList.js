/**
 * Created by caoshuai on 2016/4/10.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import Modal from '../../javascripts/common/modal.js'
import {isEmail,isStrongPassword,timeFormat} from "../../javascripts/common/function.js"
import {addRestaurantUsers,fetchStoreAdminLists,changeResUserState} from "../actions/storeUser/actions.js"
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
        this.props.dispatch(fetchStoreAdminLists(1))
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
        this.props.dispatch(addRestaurantUsers(postData,this))
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
    changeStoreUserState(id,index,state){
        var self =this;
        if(state == 0){
            swal({
                title: "确定要禁用吗?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "禁用",
                cancelButtonText: "取消"
            }, function () {
                self.props.dispatch(changeResUserState(id,index,state))
            });
        }else self.props.dispatch(changeResUserState(id,index,state))

    }
    render(){
        const {storeUserList} = this.props;
        console.log("!!!!!!!!!!!!!!!!!!!!!!! " + JSON.stringify(storeUserList))
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
                                    storeUserList.map(function(e, index){
                                    var stateBtnDom = null;
                                    if(e.state == 0){
                                        stateBtnDom = <button className="btn btn-success btn-sm" onClick={this.changeStoreUserState.bind(this,e.id,index,1)}>启用</button>;
                                    }else if(e.state == 1){
                                        stateBtnDom = <button className="btn btn-warning btn-sm" onClick={this.changeStoreUserState.bind(this,e.id,index,0)}>禁用</button>;
                                    }
                                    return(
                                        <tr key={e.id}>
                                            <td>{e.id}</td>
                                            <td>{e.email}</td>
                                            <td>{e.nickName}</td>
                                            <td>{e.state == 1 ? "已启用" : "已禁用"}</td>
                                            <td>{timeFormat(e.createTime)}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm" >开餐厅</button>&nbsp;&nbsp;
                                                <button className="btn btn-danger btn-sm" >删除</button>&nbsp;&nbsp;
                                                <button className="btn btn-warning btn-sm" >重置密码</button>&nbsp;&nbsp;
                                                {stateBtnDom}
                                            </td>
                                        </tr>
                                    )
                                }.bind(this))
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
        storeUserList: state.manageStorers.storeUserList?state.manageStorers.storeUserList:[]
    }
}
export default connect(getRestaurantList)(RestaurantList)