import React, { useState, Fragment, Component } from 'react';
import './PaymentInfoPage.scss';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import PopUp from '../../ui/PopUp/PopUp';

const PaymentInfoPage = props => {
    const stripe = useStripe();
    const elements = useElements();
    const [isForm, setIsForm] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState({ card: {} });
    const showForm = isForm || !paymentMethod.card.last4;
    const [isDeletePopUp, setIsDeletePopUp] = useState(false)
    const hideForm = () => setIsForm(false);
    const showStripForm = () => setIsForm(true);

    const { last4, name, exp_month, exp_year } = paymentMethod.card;



    const handleSubmit = async event => {
        event.preventDefault();
        const displayName = event.target.displayName.value;
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        payload.paymentMethod.card.name = displayName;

        setPaymentMethod(payload.paymentMethod);
        hideForm(false);

        console.log(payload.paymentMethod.card);
    };

    const onDelete = () => {
        setIsDeletePopUp(false);
        setPaymentMethod({ card: {} })
    }
    return (
        <Fragment>
            {isDeletePopUp && <DeleteCardPopUp onDelete={onDelete} />}
            <form className='__Payment-Info-Page' onSubmit={handleSubmit}>
                <div className='__h2 __bold'>Payment Info</div>
                {!paymentMethod.card.last4 && <div className='__dark-grey-text __mt-sm __small'>Save your credit card info to make buying stock algos super quick and easy!</div>}
                <table className={`__mt-25 ${isForm ? '__mb-15' : '__mb-2'}`}>
                    <tbody>
                        <tr>
                            <td>
                                <label className='__card-number'>
                                    <div className='__mb-sm __dark-grey-text'>Card number Number</div>
                                    {showForm ? <CardNumberElement
                                        value='4242 4242 4242 4242'
                                        onReady={() => {
                                            console.log("CardNumberElement [ready]");
                                        }}
                                        onChange={event => {
                                            console.log("CardNumberElement [change]", event);
                                        }}
                                        onBlur={() => {
                                            console.log("CardNumberElement [blur]");
                                        }}
                                        onFocus={() => {
                                            console.log("CardNumberElement [focus]");
                                        }}
                                    /> : (last4 && `**** **** **** ${last4}`)}
                                </label>
                            </td>
                            <td>
                                <label>
                                    <div className='__mb-sm __dark-grey-text'>Name on Card</div>
                                    {showForm ? <input className='__input __input-field-small' name='displayName' placeholder='John Smith' /> : name}
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    <div className='__mb-sm __dark-grey-text'>Expiration date</div>
                                    {showForm ?
                                        <CardExpiryElement
                                            onReady={() => {
                                                console.log("CardNumberElement [ready]");
                                            }}
                                            onChange={event => {
                                                console.log("CardNumberElement [change]", event);
                                            }}
                                            onBlur={() => {
                                                console.log("CardNumberElement [blur]");
                                            }}
                                            onFocus={() => {
                                                console.log("CardNumberElement [focus]");
                                            }}
                                        /> :
                                        `${exp_month}/${exp_year}`
                                    }
                                </label>
                            </td>
                            <td>
                                <label>
                                    <div className='__mb-sm __dark-grey-text'>Security Code</div>
                                    {showForm || !paymentMethod ? <CardCvcElement
                                        onReady={() => {
                                            console.log("CardNumberElement [ready]");
                                        }}
                                        onChange={event => {
                                            console.log("CardNumberElement [change]", event);
                                        }}
                                        onBlur={() => {
                                            console.log("CardNumberElement [blur]");
                                        }}
                                        onFocus={() => {
                                            console.log("CardNumberElement [focus]");
                                        }}
                                    /> : ""}
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='__flex'>
                    {showForm && <button className='__btn __pl-2 __pr-2 __mr-2'>Save Credit Card</button>}
                    {isForm && paymentMethod.card.last4 && <div className='__green-text' onClick={hideForm}>Cancel</div>}
                    {paymentMethod.card.last4 && (
                        <div className='__inline-block'>
                            <div className='__green-text __mb-2' onClick={showStripForm}>Edit Credit Card Info</div>
                            <div className='__green-text' onClick={() => setIsDeletePopUp(true)}>Delete Credit Card Info</div>
                        </div>
                    )}
                </div>
            </form>
        </Fragment>
    )
}

class DeleteCardPopUp extends Component {
    render() {
        return (
            <PopUp close={this.props.close} className='__center' width='200'>
                <div className='__h4'>
                    Are you sure you want to delete this <br /> credit card from your account?
                </div>
                <div className='__flex __mt-2'>
                    <button className='__btn __green-text' onClick={this.props.close}>Cancel</button>
                    <button className='__btn __ml-2' onClick={this.props.onDelete}>Delete</button>
                </div>
            </PopUp>
        )
    }
}

export default PaymentInfoPage;