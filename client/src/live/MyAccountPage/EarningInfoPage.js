import React, { Component, Fragment } from 'react';
import './EarningInfoPage.scss';
import Select from '../../ui/Select/Select';
import paypalImage from '../../assets/paypal-brands.png'
import PaypalPopUp from './PaypalPopUp';

class EarningInfoPage extends Component {
    state = {
        automaticPayments: false,
        isPaypalPopUp: false
    }
    showPaypalPopUp = () => this.setState({ isPaypalPopUp: true });
    hidePaypalPopUp = () => this.setState({ isPaypalPopUp: false });
    onSubmit = () => {
        this.setState({card: true, isPaypalPopUp: false})
    }
    render() {
        const { automaticPayments, isPaypalPopUp, card } = this.state;
        return (
            <Fragment>
                {isPaypalPopUp && <PaypalPopUp close={this.hidePaypalPopUp} onSubmit={this.onSubmit} />}
                <div className='__Earning-Info-Page'>
                    <div className='__h3 __bold __mb-1'>Earnings</div>
                    <div className='__flex-stretch'>
                        <div className='__f1'>
                            <div className='__lightgrey-2 __pt-s __pb-1 __flex __center __radius __earnings-card'>
                                <div className='__f1'>
                                    <div className='__dark-grey-text __mt-s __mb-15'>Lifetime Earnings</div>
                                    <div className='__h1 __light-bold __mb-sm'>$700.00</div>
                                </div>
                                <div className='__f1'>
                                    <div className='__dark-grey-text __mb-15'>Lifetime Sales</div>
                                    <div className='__h1 __light-bold'>5</div>
                                </div>
                                <div className='__f1'>
                                    <div className='__dark-grey-text __mb-15'>Lifetime Withdraws</div>
                                    <div className='__h1 __light-bold'>$700.00</div>
                                </div>
                            </div>
                            <div>
                                <div className='__h3 __bold __mb-1 __mt-2'>Monthly Earnings</div>
                                <Select value='May' name='month' onSelect={elm => console.log(elm)}>
                                    <option value='Jan'>Jan 1 - Jan 31</option>
                                    <option value='Feb'>Feb 1 - Feb 28</option>
                                    <option value='Mar'>Mar 1 - Mar 31</option>
                                    <option value='Apr'>Apr 1 - Apr 30</option>
                                    <option value='May'>May 1 - May 31</option>
                                    <option value='Jun'>Jun 1 - Jun 30</option>
                                    <option value='Jul'>Jul 1 - Jul 31</option>
                                    <option value='Aug'>Aug 1 - Aug 31</option>
                                    <option value='Sep'>Sep 1 - Sep 30</option>
                                    <option value='Oct'>Oct 1 - Oct 31</option>
                                    <option value='Nov'>Nov 1 - Nov 30</option>
                                    <option value='Dec'>Dec 1 - Dec 31</option>
                                </Select>
                                <div className='__earnings-details __mt-25'>
                                    <div className='__dark-grey-text __flex __sb __earning-details-header __small __pb-s'>
                                        <span>Your Stock Algos</span>
                                        <span>Upcoming Earnings</span>
                                    </div>
                                    <EarnedCard title='Stock Algo D' earned="150" lifeTimeEarnings='80' lifeTimeSales='2' monthlySales='1' joinDate='Feb 20, 2020' />
                                    <EarnedCard title='Stock Algo A' earned="200" lifeTimeEarnings='100' lifeTimeSales='3' monthlySales='2' joinDate='Mar 18, 2020' />
                                    <EarnedCard title='Stock Algo A' earned="40" lifeTimeEarnings='200' lifeTimeSales='6' monthlySales='5' joinDate='Oct 10, 2019' />
                                </div>
                                <div className='__flex-stretch __mt-3 __footer'>
                                    <div className='__grey-text __small __ml-a'>
                                        Your monthly earnings will become available for <br />
                                    withdrawal 4-5 business days following the last <br />
                                    day of the month. Earnings are non-binding.
                                </div>
                                    <div className='__ml-4 __mr-4 __right'>
                                        <div className="__h3 __bold">Total</div>
                                        <div className='__small __grey-text __mt-1'>StockAlgos Fees</div>
                                    </div>
                                    <div>
                                        <div className="__h3 __bold">$390</div>
                                        <div className='__small __grey-text __mt-1'>$43.33</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='__ml-4'>
                            <div className='__lightgrey-2 __p-3 __center __radius __center'>
                                <div className='__inline-block'>
                                    <div className='__h3 __bold __mb-15'>Withdraw Earnings</div>
                                    <div className='__dark-grey-text __mb-1'>Available for Withdrawal</div>
                                    <div className='__h1 __light-bold __mb-s'>$390.00</div>
                                    <div className='__green-text'>Withdraw Money</div>
                                    <div className='__dark-grey-2 __mt-1 __pt-s __pb-s __small-radius'>Pending $0</div>
                                </div>
                                <div className='__flex __mt-15 __border'>
                                    <div className='__light-bold __mr-sm'>
                                        <span>Automatic payments: </span>
                                        <span className='__bold __on-off-text __inline-block'>{automaticPayments ? 'ON ' : 'OFF'}</span>
                                    </div>
                                    <input type='checkbox'
                                        className='__switch'
                                        checked={automaticPayments}
                                        onChange={e => this.setState({ automaticPayments: e.target.checked })}
                                    />
                                </div>
                                <div className='__smaller __mt-1 __grey-text __left'>
                                    Turning on automatic payments enables <br /> your monthly earnings to be automatically <br /> deposited into your PayPal account once <br /> they become available for withdrawal.
                            </div>
                            </div>
                            <div className='__lightgrey-2 __mt-3 __p-3 __center __radius __center'>
                                <div className='__h3 __bold __mb-15'>Your Withdrawal Account</div>
                                {card ?
                                    <div className='__card __flex __bold __pointer'>
                                        <img src={paypalImage} alt='' width='20' />
                                        <span className='__ml-s __mr-a'>PayPal Account</span>
                                        <i className='fas fa-pencil-alt __dark-grey-text'></i>
                                    </div> :
                                    <div className='__btn __large-btn __flex' onClick={this.showPaypalPopUp}>
                                        <span className='__f1'>Add Payment Account</span>
                                        <div className='__h1'>+</div>
                                    </div>
                                }
                                <div className='__left __smaller __grey-text __mt-1'>
                                    Your earnings are released immediately <br />
                                    from PayPal once they process the <br />
                                     transaction. No fees.
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

class EarnedCard extends Component {
    state = {
        show: false
    }
    render() {
        const { earned, title, lifeTimeEarnings, lifeTimeSales, monthlySales, joinDate } = this.props;
        return (
            <div className={`__earned-card __mt-2 ${this.state.show ? 'show' : ''}`}>
                <div className='__flex __sb'>
                    <div>
                        <div className='__bold __mb-1'>{title}</div>
                        <div className='__flex __grey-text __smaller __pointer __mb-15' onClick={() => this.setState({ show: !this.state.show })}>
                            <span>+ See more</span>
                            <span className='__circle-earning __ml-2 __flex'>View Product info</span>
                        </div>
                    </div>
                    <span className='__bold'>${earned}</span>
                </div>
                <div className='__lightgrey-2 __pl-1 __pr-1 __small __dark-grey-text __earnedcard-earned-history'>
                    <div className='__flex __mt-1'>
                        <div>
                            <div>Lifetime earnings</div>
                            <div className='__h3 __black-text __mt-sm'>${lifeTimeEarnings}</div>
                        </div>
                        <div className='__ml-4 __mr-4'>
                            <div>Lifetime Sales</div>
                            <div className='__h3 __black-text __mt-sm'>{lifeTimeSales}</div>
                        </div>
                        <div>
                            <div>Monthly Sales</div>
                            <div className='__h3 __black-text __mt-sm'>{monthlySales}</div>
                        </div>
                    </div>
                    <div className='__mt-15'>On marketplace since {joinDate}</div>
                </div>
            </div>
        )
    }
}

export default EarningInfoPage;