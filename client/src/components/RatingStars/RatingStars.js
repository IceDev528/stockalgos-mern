import React, { PureComponent } from 'react';
import './RatingStars.scss';
import Star from '../../icons/Star';

class RatingStars extends PureComponent {
    state = { ...this.props }
    onChange = ratings => {
        const { isInput, onChange } = this.state;
        if (onChange && isInput) {
            this.setState({ ratings });
            onChange(this.refs.input);
        }
    }
    render() {
        const { className, ratings, name, isInput, small } = this.state;
        const stars = ['', '', '', '', ''];
        return (
            <div className={`__Rating-Stars ${className} ${small ? '__small' : ''}`}>
                {isInput && <input type='hidden' value={ratings} name={name} ref="input" />}
                {stars.map((_, index) => <Star key={index} className={ratings > index ? '__seconday-text' : '__lightgrey-text'} value={index} onClick={() => this.onChange((index + 1))} />)}
            </div>
        )
    }
}

export default RatingStars;