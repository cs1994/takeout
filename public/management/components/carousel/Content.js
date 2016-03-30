/**
 * Created by jiye on 16/3/15.
 */
import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import { fetchSliders,deleteSliders,changeSliderOrders } from '../../actions/sliders/action.js'

const picRoute = "http://10.1.29.250:30226/hestia/files/download/OnlyForTest/";
const contextTypes =  {
    router: React.PropTypes.object
};
export default class SliderContent extends Component {
    constructor(props) {
        super(props);
        this.changeOrder=this.changeOrder.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchSliders());
    }
    deleteSlider(id){
        let box = confirm("确定删除吗？ ");
        if(box){
            this.props.dispatch(deleteSliders(id));
        }
    }
    changeOrder(index,id,otherId){
        let box = confirm("确定修改吗？ ");
        if(box){
            this.props.dispatch(changeSliderOrders(index,id,otherId));
        }
    }
    handleSubmit(id) {
        //event.preventDefault();
        //console.log("@@@@@@@@@id "+id);
        //const path = `/carousel/upload/${id}`;
        this.context.router.push({pathname:"/carousel/upload",query:{cId:id}});
    }
    render() {
        const len =this.props.sliderList.length-1;
        const {sliderList} = this.props.sliderList;
        console.log("!!!!!!!!"　+ JSON.stringify(this.props.sliderList));
        return (
            <div className="pageheader">
                <h2><i className="fa fa-tachometer"></i> 轮播图管理
                    <div className="btn btn-success">
                        <a href="/facew/manage#/carousel/upload">
                            <i className="fa fa-plus"></i>上传图片
                        </a>
                    </div>
                </h2>
                <section className="tile">
                    <div className="tile-header">
                        <table className="table tale-condensed">
                            <thead>
                            <tr>
                                <th>顺序</th>
                                <th>图片</th>
                                <th>链接</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                $.map(this.props.sliderList, (e,i)=>{
                                    var upStyle = this.props.sliderList[i-1] ? "" : "none";
                                    var downStyle = this.props.sliderList[i+1] ? "" : "none";
                                    const upId = this.props.sliderList[i-1] !=undefined ? this.props.sliderList[i-1].id : e.id;
                                    const downId = this.props.sliderList[i+1] !=undefined ? this.props.sliderList[i+1].id : e.id;
                                    console.log("downId " +　downId);
                                    console.log("upId " +upId);
                                    return (
                                        <tr key={`attribute-${i}`}>
                                            <td>{e.order}</td>
                                            <td><img src={picRoute+e.pictureUrl}/></td>
                                            <td>{e.url}</td>
                                            <td>
                                                <div className="btn btn-success" onClick={this.changeOrder.bind(this,i,e.id,upId)}
                                                    style={{display:upStyle}}><i className="fa fa-hand-o-up"></i>上移</div>&nbsp;&nbsp;
                                                <div className="btn btn-warning" onClick={this.changeOrder.bind(this,i+1,e.id,downId)}
                                                     style={{display:downStyle}}><i className="fa fa-hand-o-down"></i>下移</div>&nbsp;&nbsp;
                                                <div className="btn btn-info" onClick={this.handleSubmit.bind(this,e.id)}>编辑</div>&nbsp;&nbsp;
                                                <div className="btn btn-danger" onClick={this.deleteSlider.bind(this,e.id)}>删除</div>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        );
    }
}
SliderContent.contextTypes = contextTypes;
SliderContent.propTypes = {
    sliderList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getSliderList(state){
    return{
        sliderList: state.manageSlider.sliderList?state.manageSlider.sliderList:[]
    }
}
export default connect(getSliderList)(SliderContent)