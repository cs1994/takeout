/**
 * Created by caoshuai on 2016/3/24.
 */
import React, { Component,PropTypes  } from 'react'

export default class Modal extends Component{
    constructor(props){
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
    }
    open(){
        //$('div.mask').css("display","block");
        const id = "#myModal"+this.props.name;
        $(id).css({'display':"block",top:"80px"});
    }
    close(){
        //$('div.mask').css("display","none");
        const id = "#myModal"+this.props.name;
        $(id).css({'display':"none"});
    }
    confirm(){
        this.props.confirm();
    }
    render(){
        return(
            <div className="modal" id={"myModal"+this.props.name} style={{zIndex:"9999"}}>
                <div className="modal-dialog" role="document" style={{zIndex:"9999"}}>
                    <div className="modal-content" style={{zIndex:"9999"}}>
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.close}>取消</button>
                            <button type="button" className="btn btn-success"
                                    onClick={this.confirm}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}