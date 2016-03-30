/**
 * Created by caoshuai on 2016/3/17.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import { Link } from 'react-router'
import { deleteBulletin} from '../../actions/bulletin/actions.js'
import { changeBulletinStates,getBulletinPages,changeBulletinPages,fetchBulletins} from '../../actions/bulletin/actions.js'
import '../../paginator/bootstrap-combined.min.css'
import '../../paginator/bootstrap-paginator.js'

const contextTypes =  {
    router: React.PropTypes.object
};
export default class BulletinManage extends Component {
    constructor(props) {
        super(props);
        this.state=({'currentPage':1});
        this.deleteBulletins = this.deleteBulletins.bind(this);
        this.changeBulletinState = this.changeBulletinState.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(getBulletinPages())
        this.props.dispatch(fetchBulletins(1));
    }
    componentDidUpdate(){
        const {bulletinPages,dispatch}=this.props;
        var me = this;
        var options = {
            currentPage: this.state.currentPage,
            totalPages: bulletinPages,
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
                dispatch(fetchBulletins(page));
                //A.IndexAction.fetchBulletinList(page);
                document.getElementsByTagName('body')[0].scrollTop = 0;
            }
        };
        $('#pagination').bootstrapPaginator(options);
    }

    deleteBulletins(id,index){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteBulletin(id,index));
        }
    }
    changeBulletinState(id,state,i){
        let title = state ==1 ?"确认禁用？" : "确认启用？";
        let box = confirm(title);
        if(box){
            this.props.dispatch(changeBulletinStates(id,state,i));
        }
    }
    handleSubmit(id,i) {
        this.context.router.push({pathname:"/publish",query:{bulletinId:id,index:i}});
    }
    render() {
        var {bulletinList} = this.props;
        //console.log("$$$$$$" +JSON.stringify(bulletinList));
        return (
            <div style={{marginTop:"10px"}}>
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/publish">发布快报</Link>
                    </div>
                </h2>
                <section className="tile">
                    <div className="tile-header">
                        <table className="table tale-condensed">
                            <thead>
                            <tr>
                                <th>顺序</th>
                                <th>标题</th>
                                <th>创建时间</th>
                                <th>最近修改时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                $.map(this.props.bulletinList, (e,i)=>{
                                    const text = e.useable == 1?"禁用" : "发布";
                                    const color = e.useable == 1?"#f0ad4e" : "#449d44";
                                    return (
                                        <tr key={`attribute-${i}`}>
                                            <td>{e.id}</td>
                                            <td>{e.title}</td>
                                            <td>{e.time}</td>
                                            <td>{e.updateTime}</td>
                                            <td>发布</td>
                                            <td>
                                                <div className="btn btn-success" onClick={this.changeBulletinState.bind(this,e.id,e.useable,i)}
                                                     style={{backgroundColor:color}}><i className="fa fa-hand-o-up"></i>{text}</div>&nbsp;&nbsp;
                                                <div className="btn btn-info" onClick={this.handleSubmit.bind(this,e.id,i)}>编辑</div>&nbsp;&nbsp;
                                                <div className="btn btn-danger" onClick={this.deleteBulletins.bind(this,e.id,i)}>删除</div>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="container">
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
BulletinManage.contextTypes = contextTypes;
BulletinManage.propTypes = {
    bulletinList:PropTypes.array.isRequired,
    bulletinPages:PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getBulletinList(state){
    return{
        bulletinList: state.bulletin.manageBulletin?state.bulletin.manageBulletin:[],
        bulletinPages:state.bulletin.bulletinPages?state.bulletin.bulletinPages:1
    }
}
export default connect(getBulletinList)(BulletinManage)