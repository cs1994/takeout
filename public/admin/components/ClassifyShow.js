/**
 * Created by caoshuai on 2016/4/18.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import Modal from '../../javascripts/common/modal.js'
import {isEmail,isStrongPassword,timeFormat} from "../../javascripts/common/function.js"
import {addFoodClassify,fetchAllFoodClassify,getClassifyDetails,updateFoodClassify,deleteFoodClassify} from "../actions/storeUser/actions.js"
/**
 * 餐厅分类列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class ClassifyShow extends Component{
    constructor(props) {
        super(props);
        this.state=({"tag":1,id:-1,index:-1});
        this.openModal=this.openModal.bind(this);
        this.onConfirm=this.onConfirm.bind(this);
        this.changeClassify=this.changeClassify.bind(this);
        this.deleteResTag=this.deleteResTag.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchAllFoodClassify())
    }
    openModal(){
        this.setState({tag:1})
        $('#nameCh').val("")
        $('#nameEn').val("")
        $('#index').val("")
        this.refs.addStoreClassify.open();
    }
    onConfirm(){
        var nameCh = $('#nameCh').val();
        var nameEn = $('#nameEn').val();
        var index = $('#index').val();

        if(nameCh==""|| nameEn==""||index==""){
            toastr.warning("请填写完整");
            return;
        }
        var postData = {nameCh: nameCh, nameEn:nameEn,index:parseInt(index)};
        console.log("$$$$ " + JSON.stringify(postData))
        if(this.state.tag==1) this.props.dispatch(addFoodClassify(postData,this))
        else{
            this.props.dispatch(updateFoodClassify(postData,this.state.id,this.state.index,this))
        }
    }
    changeClassify(data,index){
        this.setState({tag:2,id:data.id,index:index})
        $('#nameCh').val(data.tagName)
        $('#nameEn').val(data.englishName)
        $('#index').val(data.order)
        this.refs.addStoreClassify.open();
    }
    deleteResTag(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteFoodClassify(id,index))
        }
    }
    render(){
        const {resTags} = this.props;
        console.log("@@@@@@@@@@@@@@@ " +JSON.stringify(resTags))
        return(
            <div id="ShanghuManagerHome" style={{marginTop:"20px"}}>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-success" onClick={this.openModal}>
                            <i className="fa fa-plus"></i>添加分类
                        </button>
                    </div>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-striped table-condensed">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>中文名称</th>
                                    <th>英文名称</th>
                                    <th>顺序</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    resTags.map(function(e, index){
                                        return(
                                            <tr key={e.id}>
                                                <td>{e.id}</td>
                                                <td>{e.tagName}</td>
                                                <td>{e.englishName}</td>
                                                <td>{e.order}</td>
                                                <td>
                                                    <button className="btn btn-info btn-sm" onClick={this.changeClassify.bind(this,e,index)}>修改</button>&nbsp;&nbsp;
                                                    <button className="btn btn-danger btn-sm" onClick={this.deleteResTag.bind(this,e.id,index)}>删除</button>&nbsp;&nbsp;
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
                <Modal ref="addStoreClassify" title={this.state.tag==1?"添加分类":"修改分类"} Id="addStoreClassify" onConfirm={this.onConfirm}>
                    <form id="newCateForm">
                        <fieldset>
                            <div className="form-group">
                                <label for="nameCh"> 中文名称(必填)</label>
                                <input type="text" className="form-control" id="nameCh"
                                       name="nameCh" maxLength="100" placeholder=""/>
                                <p className="help-block"></p>

                            </div>
                            <div className="form-group">
                                <label for="nameEn"> 英文名称</label>
                                <input type="text" className="form-control" id="nameEn"
                                       name="nameEn" maxLength="100" placeholder=""/>
                                <p className="help-block"></p>

                            </div>
                            <div className="form-group">
                                <label for="index">顺序</label>
                                <input type="number" className="form-control" id="index"
                                       name="index" maxLength="10" placeholder=""/>
                                <p className="help-block">用于排序,序号越小,排序越靠前;如不填index值默认为100,</p>

                            </div>
                        </fieldset>
                    </form>

                </Modal>
            </div>

        )
    }
}
ClassifyShow.contextTypes = contextTypes;
ClassifyShow.propTypes = {
    resTags:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        resTags: state.manageStorers.resTags?state.manageStorers.resTags:[],
    }
}
export default connect(getRestaurantList)(ClassifyShow)