import React, { Component } from 'react';
import PopUp from '../../ui/PopUp/PopUp'

class PaypalPopUp extends Component{
    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render(){
        return(
            <PopUp width='450' close={this.props.close}>
                <form onSubmit={this.onSubmit}>
                    <div className='__h3 __bold __mb-15'>PayPal Account Info</div>
                    <label className='__small __mb-2 __block'>
                        <span className='__bold'>PayPal Email</span>
                        <input type='text' className='__input __input-field-small __mt-sm __mb-sm __pt-s __pb-s' />
                        <div className='__small __dark-grey-text'>The email you use for your PayPal account</div>
                    </label>
                    <label className='__small __mb-2 __block'>
                        <span className='__bold'>First Name</span>
                        <input type='text' className='__input __input-field-small __mt-sm __mb-sm __pt-s __pb-s' />
                        <div className='__small __dark-grey-text'>Should match the first name on the account</div>
                    </label>
                    <label className='__small __mb-25 __block'>
                        <span className='__bold'>Last Name</span>
                        <input type='text' className='__input __input-field-small __mt-sm __mb-sm __pt-s __pb-s' />
                        <div className='__small __dark-grey-text'>Should match the last name on the account</div>
                    </label>
                    <button className='__btn __ml-a __mr-a'>Submit</button>
                </form>
            </PopUp>
        )
    }
}

export default PaypalPopUp;