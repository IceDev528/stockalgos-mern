import React from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import PopUp from "../../ui/PopUp/PopUp";
import "./StripePaymentPopup.scss";

const StripePaymentPopup = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    payload.stripe = stripe;
    console.log("[PaymentMethod]", payload);
    props.onSubmit(payload);
  };

  return (
    <PopUp className="__stripe-payment-popup" close={props.close}>
      <form onSubmit={handleSubmit}>
        <div className="__h3 __bold">Payment Info</div>
        <div className="__grey-text __mt-s __mb-15">
          Enter your credit card information
        </div>
        <label>
          <div className="__h4 __mb-sm">Card number</div>
          <CardNumberElement
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label className="__mt-15 __block">
          <div className="__h4 __mb-sm">Name on card</div>
          <input
            type="text"
            className="__input __input-field-small"
            placeholder="Name"
          />
        </label>
        <div className="__flex __sb __mt-15">
          <label className="__mr-2">
            <div className="__h4 __mb-sm">Expiration date</div>
            <CardExpiryElement
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </label>
          <label className="__ml-4">
            <div className="__h4 __mb-sm">Security Code</div>
            <CardCvcElement
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </label>
        </div>
        <label className="__flex __mt-2 __mb-2">
          <input type="checkbox" className="__checkbox __mr-1" />
          <span>Save this card to my account</span>
        </label>
        <button
          type="submit"
          className="__btn __ml-a __mr-a __stripe-btn"
          disabled={!stripe}
        >
          Add Payment
        </button>
      </form>
    </PopUp>
  );
};

export default StripePaymentPopup;
