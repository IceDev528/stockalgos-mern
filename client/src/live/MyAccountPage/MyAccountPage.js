import React, { Component } from 'react';
import HeaderSideBar from '../../components/HeaderSideBar/HeaderSideBar';
import { NavLink, Switch, Route } from 'react-router-dom';
import './MyAccountPage.scss';
import AccountInfoPage from './AccountInfoPage';
import PaymentInfoPage from './PaymentInfoPage';
import EarningInfoPage from './EarningInfoPage';

class MyAccountPage extends Component {
    render() {
        return (
            <HeaderSideBar title='My Account' className='__my-account-page'>
                <header className='__grey-text __header'>
                    <div className='__flex __links-wrapper'>
                        <NavLink exact replace to='/my-account' replace>Account Info</NavLink>
                        <NavLink replace to='/my-account/payment-info'>Payment Info</NavLink>
                        <NavLink replace to='/my-account/earnings'>Earnings</NavLink>
                    </div>
                </header>
                <div className='__mt-35'>
                    <Switch>
                        <Route exact path='/my-account' component={AccountInfoPage} />
                        <Route path='/my-account/payment-info' component={PaymentInfoPage} />
                        <Route path='/my-account/earnings' component={EarningInfoPage} />
                    </Switch>
                </div>
            </HeaderSideBar>
        )
    }
}



export default MyAccountPage;