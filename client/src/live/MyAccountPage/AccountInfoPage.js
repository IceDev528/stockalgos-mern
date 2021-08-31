import React, { Component, Fragment } from 'react';
import './AccountInfoPage.scss';
import PopUp from '../../ui/PopUp/PopUp';

class AccountInfoPage extends Component {
    state = {
        isForm: false,
    }
    showForm = () => this.setState({ isForm: true });
    hideForm = () => this.setState({ isForm: false });
    render() {
        const { isForm } = this.state;
        return (
            <div className='__account-info-page'>
                <div className='__h2 __bold'>Account Info</div>
                <form>
                    <table className={`__mt-25 ${isForm ? '__mb-15' : '__mb-2'}`}>
                        <div></div>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        <div className='__dark-grey-text __mb-sm'>First name</div>
                                        {isForm ? <input className='__input __input-field-small' defaultValue='John' /> : 'John'}
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <div className='__dark-grey-text __mb-sm'>Last name</div>
                                        {isForm ? <input className='__input __input-field-small' defaultValue='Smith' /> : 'Smith'}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <div className='__dark-grey-text __mb-sm'>Email</div>
                                        {isForm ? <input className='__input __input-field-small' defaultValue='johnsmith@gmail.com' /> : 'johnsmith@gmail.com'}
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <div className='__dark-grey-text __mb-sm'>Username</div>
                                        {isForm ? <input className='__input __input-field-small' defaultValue='johnsmith123' /> : 'johnsmith123'}
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {isForm ? <div className='__flex'>
                        <button className='__btn __pl-2 __pr-2 __mr-2'>Save Changes</button>
                        <div className='__green-text' onClick={this.hideForm}>Cancel</div>
                    </div> : <div className='__green-text __inline-block' onClick={this.showForm}>Edit Account Info</div>}
                    <ChangePassword />
                </form>
            </div>
        )
    }
}

class ChangePassword extends Component {
    state = {
        isPasswordPopUp: false,
    }
    hideChangePasswordPopUp = () => this.setState({ isPasswordPopUp: false });
    render() {
        return (
            <Fragment>
                <div className='__green-text __mt-2'
                    onClick={() => this.setState({ isPasswordPopUp: true })}
                >
                    Change Password
                </div>
                {this.state.isPasswordPopUp && <PopUp close={this.hideChangePasswordPopUp}>
                    <div className='__h3 __bold'>Change Your Password</div>
                    <div className='__small __dark-grey-text __mt-sm'>
                        Password must be at least 6 characters and <br />
                        contain at least 1 number and 1 uppercase letter.
                    </div>
                    <form className='__mt-2'>
                        <label className='__block __mb-15'>
                            <div className='__bold __mb-sm'>Current password</div>
                            <input type='text' className='__small __input __input-field-small' />
                        </label>
                        <label className='__block __mb-15'>
                            <div className='__bold __mb-sm'>New password</div>
                            <input type='text' className='__small __input __input-field-small' />
                        </label>
                        <label className='__block __mb-15'>
                            <div className='__bold __mb-sm'>Re-enter password</div>
                            <input type='text' className='__small __input __input-field-small' />
                        </label>
                        <button className='__btn __ml-a __large-btn __mr-a'>Save Changes</button>
                    </form>
                </PopUp>}
            </Fragment>
        )
    }
}

export default AccountInfoPage;