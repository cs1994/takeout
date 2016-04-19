/**
 * Created by caoshuai on 2016/4/19.
 */


import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import Modal from '../../javascripts/common/modal.js'
import {isEmail,isStrongPassword,timeFormat} from "../../javascripts/common/function.js"
import {fetchAllFoodClassify,getRestaurantLists} from "../actions/storeUser/actions.js"
/**
 * 餐厅列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class RestaurantList extends Component{
    constructor(props) {
        super(props);

    }
    componentWillMount(){
        this.props.dispatch(fetchAllFoodClassify())
        this.props.dispatch(getRestaurantLists(1,0))
    }

    deleteStoreUser(id,index){
        const self =this;
        swal({
            title: "确定要删除吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消"
        }, function () {
            self.props.dispatch(deleteResUser(id,index))
        });
    }
    handleResetPwd(id){
        const self =this;
        swal({
            title: "重置该商户的登录密码?",
            text: "提醒: 修改商户密码应与商户达成一致意见,请谨慎操作",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "重置",
            cancelButtonText: "取消"
        }, function () {
            self.props.dispatch(resetResUserPWD(id))
        });
    }
    openResPage(id){
        this.context.router.push({pathname:"/restaurant/add",query:{id:id}})
    }
    render(){
        const {resList,resTags} = this.props;
        console.log("@@@@@@@@@@@@@@@ " +JSON.stringify(resList))
        return(
            <div id="RestaurantManager">

                <div className="container">
                    <br/><br/>
                    <div>
                        <label htmlFor="">筛选:</label>&nbsp;&nbsp;
                        <select className="form-control" name="second_cat_name" id="second_cat_name" onChange={this.handleClickSecondCat} style={{display: 'inline', maxWidth: '10em'}}>
                            <option value="" data-toggle="tooltip" data-placement="top" title=""></option>
                            <option value={0} data-toggle="tooltip" data-placement="top" title="">全部</option>
                            {
                                resTags.map(function(s){
                                return <option value={s.id} data-toggle="tooltip" data-placement="top" title={s.id}>{s.tagName}</option>;
                            })
                            }
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-striped table-condensed">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>index</th>
                                    <th>Logo</th>
                                    <th>名称</th>
                                    <th>所属类别</th>
                                    <th>所属商户ID</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    resList.map(function(e, index){
                                    var stateBtnDom = null;
                                    if(e.authState == 0){
                                        stateBtnDom = <button className="btn btn-success btn-sm" >启用</button>;
                                    }else if(e.authState == 1){
                                        stateBtnDom = <button className="btn btn-warning btn-sm" >禁用</button>;
                                    }

                                    //var tagName = this.getTagNameByTagId(e.tagId);
                                    return(
                                        <tr key={e.id}>
                                            <td>{e.id}</td>
                                            <td>{e.index}</td>
                                            <td>
                                                <img src={e.pic} width="50" height="50" alt=""/>
                                            </td>
                                            <td>{e.name}</td>
                                            <td>{e.classifyName}</td>
                                            <td>{e.ownerId}</td>
                                            {/*<td>{e.isOpen == 1 ? "营业中" : "未营业"}</td>*/}
                                            <td>{e.authState == 1 ? "已启用" : "已禁用"}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm" >排序</button>&nbsp;&nbsp;
                                                <button className="btn btn-danger btn-sm" >删除</button>&nbsp;&nbsp;
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


                <div className="modal fade" id="sortModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">修改排序</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="description">新序号</label>
                                    <input type="number" className="form-control" id="sortIndex"
                                           name="sortIndex" maxLength="10" placeholder=""/>
                                    <p className="help-block">序号越小,排序越靠前</p>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary" onClick={this.changeSortIndex}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div id="pagination"></div>
                    </div>
                </div>

            </div>

        )
    }
}
RestaurantList.contextTypes = contextTypes;
RestaurantList.propTypes = {
    resList:PropTypes.array.isRequired,
    resTags:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        resList: state.manageStorers.resList?state.manageStorers.resList:[],
        resTags: state.manageStorers.resTags?state.manageStorers.resTags:[]
    }
}
export default connect(getRestaurantList)(RestaurantList)