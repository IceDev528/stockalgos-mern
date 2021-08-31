import React, { Component, Children } from 'react';
import './Select.scss';

class Select extends Component {
    state = {
        showOptions: false,
        value: '',
        property: '',
    }
    onSelect = child => {
        this.setState({ value: child.props.value, property: child.props.children });
        this.props.onSelect && this.props.onSelect(this.refs.select);
    };
    render() {
        const { title, className, name } = this.props;
        const { showOptions, value, property } = this.state;
        return (
            <div className={`__select-container ${className}`}>
                <button
                    type='button'
                    onFocus={() => this.setState({ showOptions: true })}
                    onBlur={() => this.setState({ showOptions: false })}
                    className={`__lightgrey-2 __shown-value __flex __sb __pointer`}
                >
                    <div className='__mr-1'>{title} <span className='__bold'>{property}</span></div>
                    <i className="fas fa-chevron-down"></i>
                    <input type='hidden' value={value} name={name} ref='select' />
                </button>
                {this.childs && <div className={`__options-wrapper ${showOptions ? '__show' : ''}`}>
                    <div className='__chevron-up'> </div>
                    <div className='__options __lightgrey-2'>
                        {this.childs.map((child, index) => <div onClick={() => this.onSelect(child)} key={index}>{child.props.children}</div>)}
                    </div>
                </div>}
            </div>
        )
    }
    componentDidMount = () => {
        const { children, value } = this.props;
        this.childs = Children.toArray(children);
        const property = this.childs.find(child => child.props.value === value).props.children;
        this.setState({ value, property });
    };
}


export default Select;