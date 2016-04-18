/**
 * Created by caoshuai on 2016/4/18.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
//import Modal from '../../../javascripts/common/modal.js'
import {isEmail,isStrongPassword,timeFormat} from "../../javascripts/common/function.js"
import {addRestaurantUsers,fetchStoreAdminLists} from "../actions/storeUser/actions.js"
/**
 * 餐厅主人列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class AddRestaurant extends Component{
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
    render(){
        const {storeUserList} = this.props;
        return(
            <div id="RestaurantAdd">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-md-offset-3">
                            <form id="newDishForm">
                                <fieldset>
                                    <div id="legend" className="">
                                        <legend className="">新建餐厅</legend>
                                    </div>
                                    <div className="form-group">
                                        <label for="category">所属类别(必填)</label>
                                        <select className="form-control" id="category" name="category">
                                            {
                                            //    this.state.RestaurantTagsStore.tagList.map(function(e){
                                            //    return(
                                            //        <option value={e.tagId}>{e.tagName}</option>
                                            //    )
                                            //}.bind(this))
                                            }
                                        </select>
                                        <p className="help-block">餐厅主营归类</p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishName">名称(必填, 20字以内)</label>
                                        <input type="text" className="form-control" id="name"
                                               name="name" placeholder="" maxLength="20"/>
                                        <p className="help-block">一个好的名字有利于顾客记住</p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishPic">Logo图片(必填,{"<"}1M)</label>
                                        <input type="file" id="picURLInput" />
                                        <img id="picURLImg" src="" alt="" width="100" height="100"/>
                                        <p className="help-block">此图将作为餐厅的Logo, 最佳尺寸:宽高比1:1, 推荐100px*100px</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="address">地址(必填, 50字以内)</label>
                                        <input type="text" className="form-control" id="address"
                                               name="address" placeholder="" maxLength="50"/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="tel">联系电话(必填)</label>
                                        <input type="text" className="form-control" id="tel"
                                               name="tel" placeholder="" maxLength="50"/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishDesc">简介(必填, 500字以内)</label>
                                            <textarea type="text" className="form-control" id="description"
                                                      name="description" maxLength="500" rows="5" placeholder=""/>
                                        <p className="help-block">对此餐厅的简单的描述,来让顾客快速了解该餐厅</p>

                                    </div>

                                    <div className="form-group">
                                        <label for="basePrice">起送价(必填)</label>
                                        <input type="number" className="form-control" id="basePrice"
                                               name="basePrice" placeholder=""/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="packFee">配送费(必填)</label>
                                        <input type="number" className="form-control" id="packFee"
                                               name="packFee" placeholder=""/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="duringTime">平均送达时间(必填,单位:分钟)</label>
                                        <input type="number" className="form-control" id="duringTime"
                                               name="duringTime" placeholder=""/>
                                        <p className="help-block">从接单到送到客户手中的平均所用时间</p>

                                    </div>

                                    <button type="submit" className="btn btn-success btn-block"
                                            >提交</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
AddRestaurant.contextTypes = contextTypes;
AddRestaurant.propTypes = {
    storeUserList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        storeUserList: state.manageStorers.storeUserList?state.manageStorers.storeUserList:[]
    }
}
export default connect(getRestaurantList)(AddRestaurant)