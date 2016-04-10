/**
 * Created by caoshuai on 2016/4/10.
 */

import React, { Component,PropTypes  } from 'react'

export default class Modal extends Component{
    constructor(props) {
        super(props);
        this.open=this.open.bind(this);
        this.close=this.close.bind(this);
        this.confirm=this.confirm.bind(this);
    }
    open(){
        let id="#"+this.props.Id;
        $(id).modal('show');
    }
    close(){
        let id="#"+this.props.Id;
        $(id).modal('hide');
    }
    confirm(){
    this.props.onConfirm();
    }
    render(){
        const {Id} = this.props;
        return(
            <div className="modal fade" id={Id} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.close}>取消</button>
                            <button type="button" className="btn btn-primary" onClick={this.confirm}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Modal.propTypes = {
    Id:PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title:PropTypes.string.isRequired
};