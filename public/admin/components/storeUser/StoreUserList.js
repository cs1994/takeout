/**
 * Created by caoshuai on 2016/4/10.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import Modal from '../../../javascripts/common/modal.js'
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
    }
    componentWillMount(){
    }
    openModal(){
        this.refs.addStoreUser.open();
    }
    onConfirm(){

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