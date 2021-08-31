import React from 'react';
import chartsimage from '../../assets/undraw_stock_prices.png';
import undrawFinance from '../../assets/undraw_finance.png';
import './AuthBackground.scss'

const AuthBackground = props => (
    <div className='__Auth-Background __f1 __col __sb'>
        <img src={chartsimage} alt='' className='__ml-a __stock-charts' />
        <div className='__mr-a __ml-a'>
            <div className='__big-title'>Your One-Stop <br /> Shop For Stock <br /> Algorithms</div>
            <div className='__mt-2'>StockAlgos is a marketplace where you can buy and sell stock <br /> algorithms to help you trade smart, not hard.</div>
        </div>
        <img src={undrawFinance} alt='' className='__mr-a __undraw-finance' />
    </div>
)

export default AuthBackground;