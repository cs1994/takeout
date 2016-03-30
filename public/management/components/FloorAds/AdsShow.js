/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'
import {getAllClassifys,getLabels,getAdsByCateAndLabel,getAllAds,deleteAds,getAdPages} from '../../actions/FloorAds/actions.js'
import {picRoute} from "../carousel/CarouselUpload.js"
import '../../paginator/bootstrap-combined.min.css'
import '../../paginator/bootstrap-paginator.js'

const contextTypes =  {
    router: React.PropTypes.object
};
export default class AdsShow extends Component {
    constructor(props) {
        super(props);
        this.state=({'currentPage':1,'tag':1});
        this.handleClickFirstCat = this.handleClickFirstCat.bind(this);
        this.handleClickSecondCat = this.handleClickSecondCat.bind(this);
        this.changeAd = this.changeAd.bind(this);
        this.deleteAd = this.deleteAd.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(getAdPages())
        this.props.dispatch(getAllAds(1))
        this.props.dispatch(getAllClassifys())
    }
    componentDidUpdate(){
        const {adPage,dispatch}=this.props;
        var me = this;
        var options = {
            currentPage: this.state.currentPage,
            totalPages: adPage,
            alignment:"center",
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "尾页";
                    case "page":
                        return page;
                }

            },
            onPageClicked: function(e,originalEvent,type,page){
                me.setState({currentPage:page})
                dispatch(getAllAds(page));
                //A.IndexAction.fetchBulletinList(page);
                document.getElementsByTagName('body')[0].scrollTop = 0;
            }
        };
        $('#pagination').bootstrapPaginator(options);
    }
    handleClickFirstCat(){
        var id = $('#first_cat_name').val();
        if(id == "") return;
        //global.actions.CategoryActions.fetchSecondCatList(id);
        const index =$('#first_cat_name').find("option:selected").attr('title');
        //console.log("first_cat_name#########index " +index);
        if(id !=-1) {
            $('#second_cat_name').css({display: 'inline'});
            $('#second_cat_name').val(-1);
            this.props.dispatch(getLabels(index));
            const cId= $('#first_cat_name').val();
            const lId= $('#second_cat_name').val();
            this.props.dispatch(getAdsByCateAndLabel(cId,lId))
            this.setState({tag:2})
        }
        else {
            this.setState({tag:1})
            $('#second_cat_name').css({display: 'none'});
            this.props.dispatch(getAllAds())
        }
    }
    handleClickSecondCat(){
        const cId= $('#first_cat_name').val();
        const lId= $('#second_cat_name').val();
        //console.log("@@@@@@@@@@@@@@ " + cId+"#" +lId)
        this.props.dispatch(getAdsByCateAndLabel(cId,lId))
    }
    changeAd(id,index){
        this.context.router.push({pathname:"/addadvertisement",query:{adId:id,index:index}});
    }
    deleteAd(id,index){
        let box = confirm("确定删除吗？");
        if(box){
            this.props.dispatch(deleteAds(id,index))
        }
    }
    render() {
        const {adList,classifyList,labelList}=this.props;
        //console.log("@@@@@@@@@@@@adList   " + JSON.stringify(adList));
        const pageStyle =this.state.tag==1?"block":"none";
        return (
            <div style={{marginTop:"10px"}}>
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/addadvertisement">新建广告位</Link>
                    </div>
                </h2>

                <section className="tile">
                    <div className="tile-header">
                        <div>
                            <label htmlFor="" style={{color:"#fff"}}>筛选:</label>&nbsp;&nbsp;
                            <select className="form-control" name="first_cat_name" id="first_cat_name" onChange={this.handleClickFirstCat} style={{maxWidth: '10em',display: 'inline'}}>
                                <option value={-1} data-toggle="tooltip" data-placement="top" title={-1}>全部</option>
                                { classifyList.map(function(s,i){
                                    return <option value={s.categoryId} data-toggle="tooltip" data-placement="top" title={i}>{s.categoryName}</option>;
                                })}
                            </select>
                            &nbsp;&nbsp;
                            <select className="form-control" name="second_cat_name" id="second_cat_name" onChange={this.handleClickSecondCat} style={{maxWidth: '10em', display: 'none'}}>
                               <option value={-1} data-toggle="tooltip" data-placement="top" title=""></option>;
                                {labelList.map(function(s){
                                        return <option value={s.id} data-toggle="tooltip" data-placement="top" title={s.name}>{s.name}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <table className="table tale-condensed">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>一级类别</th>
                                <th>二级类别</th>
                                <th>位置</th>
                                <th>图片</th>
                                <th>链接</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {$.map(adList, (e,i)=>{
                                    return (
                                        <tr key={`attribute-${i}`}>
                                            <td>{e.id}</td>
                                            <td>{e.category}</td>
                                            <td>{e.label}</td>
                                            <td>{e.order}</td>
                                            <td><img style={{height:"50px",width:"50px"}} src={picRoute+e.pictureUrl} alt=""/></td>
                                            <td>{e.url}</td>
                                            <td>{e.insertTime}</td>
                                            <td>
                                                <div className="btn btn-info" onClick={this.changeAd.bind(this,e.id,i)}>修改</div>&nbsp;&nbsp;
                                                <div className="btn btn-danger" onClick={this.deleteAd.bind(this,e.id,i)}>删除</div>
                                            </td>
                                        </tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="container" style={{display:pageStyle}}>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <div id="pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AdsShow.contextTypes = contextTypes;
AdsShow.propTypes = {
    adList:PropTypes.array.isRequired,
    classifyList:PropTypes.array.isRequired,
    labelList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getAds(state){
    return{
        adList: state.floorAds.adList?state.floorAds.adList:[],
        classifyList: state.floorAds.classifyList?state.floorAds.classifyList:[],
        labelList: state.floorAds.labelList?state.floorAds.labelList:[],
        adPage: state.floorAds.adPage?state.floorAds.adPage:1
    }
}
export default connect(getAds)(AdsShow)