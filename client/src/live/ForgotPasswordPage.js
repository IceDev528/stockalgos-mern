import React, { Component } from 'react';
import logo from '../assets/logo.png';
import chartsimage from '../assets/undraw_stock_prices.png';
import personimage from '../assets/undraw_forgot_password_gi2d.png';
import './ForgotPasswordPage.scss'
import { Link } from 'react-router-dom';

class ForgotPasswordPage extends Component {
    state = {
        isEmailSent: false
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({isEmailSent: true});
    }
    render() {
        return (
            <div className='__ForgotPasswordPage __auth-Page __flex-stretch'>
                {this.state.isEmailSent ? <EmailSentMessage /> : (
                    <div className='__auth-wrapper'>
                        <img src={logo} alt='' className='__logo __mb-4' />
                        <div className='__h2 __bold __mb-1'>Forgot your password?</div>
                        <p className='__mb-4'>Enter the email you used when creating your account and we’ll send you instructions to reset your password</p>
                        <form onSubmit={this.onSubmit}>
                            <input type='text' className='__input-field' placeholder='Email' />
                            <div className='__flex __sb __mt-3'>
                                <button className='__btn'>Send</button>
                                <div className='__green-text' onClick={this.props.history.goBack}>
                                    <i className="fas fa-chevron-left __mr-s"></i>Back
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                <ForgotPasswordBackground />
            </div>
        )
    }
}

const EmailSentMessage = () => (
    <div className='__auth-wrapper'>
        <img src={logo} alt='' className='__logo __mb-4' />
        <div className='__h2 __bold __mb-1'>Check your email</div>
        <div className='__mb-4 __pb-1'>
            If an account exists for the email you entered, you’ll receive a temporary password that will allow you to login.
            <p className='__mt-1'>Once you’re in, you’ll need to go to your account settings and set a new password.</p>
        </div>
        <Link to='/login' replace className='__green-text'>
            <i className="fas fa-chevron-left __mr-s"></i>Back to login
        </Link>
    </div>
)

const ForgotPasswordBackground = () => (
    <div className='__ForgotPassword-Background __Auth-Background __f1 __col __sb'>
        <img src={chartsimage} alt='' className='__ml-a __stock-charts' />
        <img src={personimage} alt='' className='__ml-a __mr-a __forgotpassword-image' />
    </div>
)

export default ForgotPasswordPage;