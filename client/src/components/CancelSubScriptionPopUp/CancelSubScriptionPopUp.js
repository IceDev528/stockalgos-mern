import React, { Component } from 'react';
import PopUp from '../../ui/PopUp/PopUp';
import {withRouter} from 'react-router-dom';

class CancelSubScriptionPopUp extends Component{
    onClick = () => {
        this.props.history.goBack();
    }
    render(){
        return(
            <PopUp showcross={false} className='__center __m--1' small close={this.props.close}>
                Are you sure you want to cancel your <br /> subscription to
                <span className='__bold'> Stock Algo B</span>?
                <div className='__flex __mt-15'>
                    <button className='__btn __green-text __mr-2' onClick={this.props.close}>No, Keep</button>
                    <button className='__btn' onClick={this.onClick}>Yes, Cancel</button>
                </div>
            </PopUp>
        )
    }
}

export default withRouter(CancelSubScriptionPopUp);