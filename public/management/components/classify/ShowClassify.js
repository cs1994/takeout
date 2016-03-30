/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'
import { fetchClassifys,getNowClassifys,addLabels,deleteLabels,
    addBrands,deleteBrands,updateLabels,updateBrands,deleteClassifys} from '../../actions/classify/actions.js'
import Modal from '../common/Modal.js'

const picRoute = "http://10.1.29.250:30226/hestia/files/download/OnlyForTest/";
const contextTypes =  {
    router: React.PropTypes.object
};
export default class ClassifyShow extends Component {
    constructor(props) {
        super(props);
        this.state={'id':1,'labelTag':1,'brandTag':1,index:-1,changeId:-1};
        this.handleClickFirstCat = this.handleClickFirstCat.bind(this);
        this.openLabel = this.openLabel.bind(this);
        this.openBrand = this.openBrand.bind(this);
        this.submitLabel = this.submitLabel.bind(this);
        this.submitBrand = this.submitBrand.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.changeBrand = this.changeBrand.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchClassifys())
        //this.props.dispatch(fetchAllFirstClassify())
    }
    handleClickFirstCat(){
        var id = $('#first_cat_name').val();
        if(id == "") return;
        else if(id==-1){
            this.setState({id:1});
        }
        else{
            this.props.dispatch(getNowClassifys(id));
            this.setState({id:2});
        }
    }

    deleteLabel(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteLabels(id,index))
        }
    }
    submitBrand(){
        const name = $("#BrandName").val();
        const url = $("#BrandUrl").val();
        const number = $("#BrandIndex").val();
        const num = number==""?100:number;
        if(name == "" || url==""){
            toastr.warning("必填项有空,请检查");
            return;
        }
        const postData={name:name,category:this.props.nowClassify.categoryId,order:num,url:url};
        if(this.state.brandTag == 1) this.props.dispatch(addBrands(postData))
        else this.props.dispatch(updateBrands(this.state.changeId,postData,this.state.index))
    }
    openLabel(){
        this.refs.newLabel.open();$('#labelName').val("");$('#labelIndex').val("");
        this.setState({labelTag:1});}
    openBrand(){this.refs.newBrand.open();
        $('#BrandName').val("");
        $('#BrandIndex').val("");
        $('#BrandUrl').val("");this.setState({brandTag:1})}
    submitLabel(){
        const name = $("#labelName").val();
        const number = $("#labelIndex").val();
        const num = number==""?100:number;
        if(name == ""){
            toastr.warning("必填项有空,请检查");
            return;
        }
        const postData={name:name,category:this.props.nowClassify.categoryId,order:num};
        if(this.state.labelTag == 1) this.props.dispatch(addLabels(postData))
        else this.props.dispatch(updateLabels(this.state.changeId,postData,this.state.index))
    }
    deleteBrand(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteBrands(id,index))
        }
    }
    changeLabel(data,index){
        this.refs.newLabel.open();
        $('#labelName').val(data.name);
        $('#labelIndex').val(data.order);
        this.setState({labelTag:2,index:index,changeId:data.id})
    }
    changeBrand(data,index){
        this.refs.newBrand.open();
        $('#BrandName').val(data.sTypeName);
        $('#BrandIndex').val(data.sOrder);
        $('#BrandUrl').val(data.sUrl);
        this.setState({brandTag:2,index:index,changeId:data.id})
    }
    changeClassify(id){
        this.context.router.push({pathname:"/newclassify",query:{classifyId:id}});
    }
    deleteFirstClassify(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteClassifys(id,index))
        }
    }
    render() {
        const {nowClassify,firstClassify,classifyList} = this.props;
        //console.log("#################firstClassify "+JSON.stringify(firstClassify));
        //console.log("#################classifyList "+JSON.stringify(classifyList));
        const style1 = this.state.id==1?"block":"none";
        const style2 = this.state.id==2?"block":"none";
        //console.log("!! " + style1 +style2);
        return (
            <div style={{marginTop:"10px"}}>
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/newclassify">新建分类</Link>
                    </div>
                </h2>
                <div>
                    <label htmlFor="" style={{color:"#fff"}}>选择:</label>&nbsp;&nbsp;
                    <select className="form-control" name="first_cat_name" id="first_cat_name" onChange={this.handleClickFirstCat}
                            style={{maxWidth: '10em',display: 'inline',backgroundColor:"#ccc"}}>
                        <option value={-1} data-toggle="tooltip" data-placement="top" title="">所有一级分类</option>
                        {classifyList.map(function(s,i){
                            return <option value={i} data-toggle="tooltip" data-placement="top" title={s.categoryEnglishName}>{s.categoryName}</option>;
                        }.bind(this))
                        }
                    </select>
                </div>
                <section className="tile" id="section1" style={{display:style1}}>
                    <div className="tile-header">
                        <table className="table tale-condensed">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>中文名称</th>
                                <th>英文名称</th>
                                <th>顺序</th>
                                <th>cover</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                $.map(classifyList, (e,i)=>{

                                    return (
                                        <tr key={`attribute-${i}`}>
                                            <td>{e.categoryId}</td>
                                            <td>{e.categoryName}</td>
                                            <td>{e.categoryEnglishName}</td>
                                            <td>{e.categoryOrder}</td>
                                            <td><img src={picRoute+e.categoryPic}/></td>
                                            <td>
                                                <div className="btn btn-info" onClick={this.changeClassify.bind(this,e.categoryId)}>编辑</div>&nbsp;&nbsp;
                                                <div className="btn btn-danger" onClick={this.deleteFirstClassify.bind(this,e.categoryId,i)}>删除</div>
                                            </td>
                                        </tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="tile" id="section2" style={{display:style2}}>
                    <div className="tile-header" style={{position:"relative"}}>
                        <p>广告楼层下的标签</p>
                        <h2 className="uploadButton" style={{top:"5px"}}>
                            <div className="btn btn-success" >
                                <i className="fa fa-plus"></i>
                                <span onClick={this.openLabel}>新建标签</span>
                                </div>
                                </h2>
                                <table className="table tale-condensed">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>名称</th>
                                        <th>顺序</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {$.map(nowClassify.categoryLabelAds, (e,i)=>{
                                        return (
                                            <tr key={`attribute-${i}`}>
                                                <td>{e.id}</td>
                                                <td>{e.name}</td>
                                                <td>{e.order}</td>
                                                <td>
                                                    <div className="btn btn-info" onClick={this.changeLabel.bind(this,e,i)}>修改</div>&nbsp;&nbsp;
                                                    <div className="btn btn-danger" onClick={this.deleteLabel.bind(this,e.id,i)}>删除</div>
                                                </td>
                                            </tr>)
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="tile-header" style={{marginTop:"10px",position:"relative"}}>
                                <p>广告楼层下的品牌快速入口</p>
                                <h2 className="uploadButton" style={{top:"5px"}}>
                                    <div className="btn btn-success" >
                                        <i className="fa fa-plus"></i>
                                        <span onClick={this.openBrand}>新建品牌入口</span>
                                    </div>
                                </h2>
                                <table className="table tale-condensed">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>名称</th>
                                        <th>顺序</th>
                                        <th>链接</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {$.map(nowClassify.categorySType, (e,i)=>{
                                        return (
                                            <tr key={`attribute-${i}`}>
                                                <td>{e.id}</td>
                                                <td>{e.sTypeName}</td>
                                                <td>{e.sOrder}</td>
                                                <td>{e.sUrl}</td>
                                                <td>
                                                    <div className="btn btn-info" onClick={this.changeBrand.bind(this,e,i)}>修改</div>&nbsp;&nbsp;
                                                    <div className="btn btn-danger" onClick={this.deleteBrand.bind(this,e.id,i)}>删除</div>
                                                </td>
                                            </tr>)
                                    })}
                                    </tbody>
                                </table>
                            </div>

                        </section>
                <Modal ref="newLabel" title="新建标签" confirm={this.submitLabel} name={"Label"}>
                    <div className="form-group">
                        <label for="labelName"> 中文名称(必填)</label>
                        <input type="text" className="form-control" id="labelName"
                               name="labelName" maxLength="100" placeholder=""/>
                        <p className="help-block"></p>
                    </div>
                    <div className="form-group">
                        <label for="labelIndex">顺序</label>
                        <input type="number" className="form-control" id="labelIndex"
                               name="labelIndex" maxLength="10" placeholder=""/>
                        <p className="help-block">用于排序,序号越小,排序越靠前;如不填index值默认为100,</p>
                    </div>
                </Modal>
                <Modal ref="newBrand" title="新建品牌入口" confirm={this.submitBrand} name={"Brand"}>
                    <div className="form-group">
                        <label for="BrandName"> 名称(必填)</label>
                        <input type="text" className="form-control" id="BrandName"
                               name="BrandName" maxLength="100" placeholder=""/>
                        <p className="help-block"></p>
                    </div>
                    <div className="form-group">
                        <label for="BrandIndex">顺序</label>
                        <input type="number" className="form-control" id="BrandIndex"
                               name="BrandIndex" maxLength="10" placeholder=""/>
                        <p className="help-block">用于排序,序号越小,排序越靠前;如不填index值默认为100,</p>
                    </div>
                    <div className="form-group">
                        <label for="BrandUrl"> 链接(必填)</label>
                        <input type="text" className="form-control" id="BrandUrl"
                               name="BrandUrl" maxLength="100" placeholder=""/>
                        <p className="help-block"></p>
                    </div>
                </Modal>
            </div>
        )
    }
}
ClassifyShow.contextTypes = contextTypes;
ClassifyShow.propTypes = {
    nowClassify:PropTypes.object.isRequired,
    //firstClassify:PropTypes.array.isRequired,
    classifyList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getClassifyList(state){
    return{
        nowClassify: state.classifyList.nowClassify?state.classifyList.nowClassify:{},
        //firstClassify: state.classifyList.firstClassify?state.classifyList.firstClassify:[],
        classifyList: state.classifyList.classifyList?state.classifyList.classifyList:[]
    }
}
export default connect(getClassifyList)(ClassifyShow)