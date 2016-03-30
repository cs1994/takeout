/**
 * Created by caoshuai on 2016/3/30.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import { Link } from 'react-router'
import {fetchRecommends,addRecommend,deleteRecommend,updateRecommend,changeRecommendOrder} from '../../actions/recommend/actions.js'
import Modal from '../common/Modal.js'

const contextTypes =  {
    router: React.PropTypes.object
};
export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state=({"storeTag":1,"index":-1,"changeId":-1})
        this.changeOrder=this.changeOrder.bind(this);
        this.openStore=this.openStore.bind(this);
        this.submitStores=this.submitStores.bind(this);
        this.updateStores=this.updateStores.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchRecommends());
    }
    deleteRecommends(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteRecommend(id,index));
        }
    }
    changeOrder(index,id,otherId){
        this.props.dispatch(changeRecommendOrder(index,id,otherId));
    }
    updateStores(data,index) {
        this.refs.newStore.open();
        $('#storeName').val(data.name);
        $('#storeIndex').val(data.order);
        $("#storeUrl").val(data.url)
        this.setState({storeTag:2,index:index,changeId:data.id})
    }
    openStore(){
        this.refs.newStore.open();$('#storeName').val("");$('#storeIndex').val("");$("#storeUrl").val("")
        this.setState({storeTag:1});}
    submitStores(){
        const name = $("#storeName").val();
        const url = $("#storeUrl").val();
        const number = $("#storeIndex").val();
        const num = number==""?100:number;
        if(name == "" || url==""){
            toastr.warning("必填项有空,请检查");
            return;
        }
        const postData={name:name,order:num,url:url};
        if(this.state.storeTag == 1) this.props.dispatch(addRecommend(postData))
        else this.props.dispatch(updateRecommend(this.state.changeId,postData,this.state.index))
    }
    render() {
        //const len =this.props.sliderList.length-1;
        const {recommendList} = this.props;
        console.log("!!!!!!!!"　+ JSON.stringify(recommendList));
        return (
            <div className="pageheader">
                <h2><i className="fa fa-tachometer"></i>商家推荐管理</h2>
                <div style={{marginTop:"10px"}}>
                    <h2 className="uploadButton">
                        <div className="btn btn-success" >
                            <i className="fa fa-plus"></i>
                            <span onClick={this.openStore}>添加商家</span>
                        </div>
                    </h2>
                    <section className="tile">
                        <div className="tile-header">
                            <table className="table tale-condensed">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>顺序</th>
                                    <th>名称</th>
                                    <th>链接</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    $.map(recommendList, (e,i)=>{
                                        var upStyle = recommendList[i-1] ? "" : "none";
                                        var downStyle = recommendList[i+1] ? "" : "none";
                                        const upId = recommendList[i-1] !=undefined ? recommendList[i-1].id : e.id;
                                        const downId = recommendList[i+1] !=undefined ? recommendList[i+1].id : e.id;
                                        //console.log("downId " +　downId);
                                        //console.log("upId " +upId);
                                        return (
                                            <tr key={`attribute-${i}`}>
                                                <td>{e.id}</td>
                                                <td>{e.order}</td>
                                                <td>{e.name}</td>
                                                <td>{e.url}</td>
                                                <td>
                                                    <div className="btn btn-success" onClick={this.changeOrder.bind(this,i,e.id,upId)}
                                                         style={{display:upStyle}}><i className="fa fa-hand-o-up"></i>上移</div>&nbsp;&nbsp;
                                                    <div className="btn btn-warning" onClick={this.changeOrder.bind(this,i+1,e.id,downId)}
                                                         style={{display:downStyle}}><i className="fa fa-hand-o-down"></i>下移</div>&nbsp;&nbsp;
                                                    <div className="btn btn-info" onClick={this.updateStores.bind(this,e,i)}>编辑</div>&nbsp;&nbsp;
                                                    <div className="btn btn-danger" onClick={this.deleteRecommends.bind(this,e.id,i)}>删除</div>
                                                </td>
                                            </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                <Modal ref="newStore" title="添加商家" confirm={this.submitStores} name={"Store"}>
                    <div className="form-group">
                        <label for="storeName"> 名称(必填)</label>
                        <input type="text" className="form-control" id="storeName"
                               name="storeName" maxLength="100" placeholder=""/>
                        <p className="help-block"></p>
                    </div>
                    <div className="form-group">
                        <label for="storeIndex">顺序</label>
                        <input type="number" className="form-control" id="storeIndex"
                               name="storeIndex" maxLength="10" placeholder=""/>
                        <p className="help-block">用于排序,序号越小,排序越靠前;如不填index值默认为100,</p>
                    </div>
                    <div className="form-group">
                        <label for="storeUrl"> 链接(必填)</label>
                        <input type="text" className="form-control" id="storeUrl"
                               name="storeUrl" maxLength="100" placeholder=""/>
                        <p className="help-block"></p>
                    </div>
                </Modal>
            </div>
        );
    }
}
Recommend.contextTypes = contextTypes;
Recommend.propTypes = {
    recommendList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRecommendList(state){
    return{
        recommendList: state.manageRecommend.recommendList?state.manageRecommend.recommendList:[],
    }
}
export default connect(getRecommendList)(Recommend)