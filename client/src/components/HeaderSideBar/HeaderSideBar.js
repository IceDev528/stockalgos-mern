import React from 'react';
import BellSolid from '../../icons/BellSolid';
import SideBar from '../../components/SideBar/SideBar';


const HeaderSideBar = ({ title, className = '', children, addMargin = true }) => (
    <div className='__flex-stretch'>
        <SideBar />
        <div className={`__m-4 __f1 ${className}`}>
            <div className={`__flex __sb __relative ${addMargin ? '__mb-35' : ''}`}>
                <div className='__bolder __h1 __primary-text-darken-1'>{title}</div>
                <BellSolid className='__primary-text __h2' />
            </div>
            {children}
        </div>
    </div>
)

export default HeaderSideBar;