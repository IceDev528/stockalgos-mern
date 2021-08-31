import React, { Component } from "react";
import PopUp from "../../ui/PopUp/PopUp";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

class ConfirmPaymentPopUp extends Component {
  onClick = async () => {
    this.props.onConfirmation();
    const { stripe } = this.props.paymentMethodReq;

    const paymentMethodReq = this.props.paymentMethodReq;
    const userId = localStorage.getItem("userId");
    const savePurchaseAlgoData = {
      userId: userId,
      algoId: this.props.algoData,
    };

    try {
      const { data: clientSecret } = await axios.post(
        "/create-payment-intent",
        {
          amount: this.props.price * 100,
        }
      );
      console.log("clientsecret", clientSecret);
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });
      console.log("error", error);
      if (error) {
        console.log("confirm err", error.message);
      } else {
        // if (result.paymentIntent.status === "succeeded") {
        // }
        axios
          .post("/myPurchases/save", savePurchaseAlgoData)
          .then((response) => {
            console.log("success", response);
          });
        console.log("Success");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  render() {
    return (
      <PopUp showcross={false} className="__center">
        You’re about to buy
        <div className="__bold __h4 __line-height">Title of Stock Algo</div>
        Click ‘Confirm’ to complete your purchase
        <div className="__flex __flex-equal-space __mt-2">
          <button className="__btn __green-text" onClick={this.props.close}>
            Cancel
          </button>
          <button className="__btn" onClick={this.onClick}>
            Confirm
          </button>
        </div>
      </PopUp>
    );
  }
}

export default ConfirmPaymentPopUp;
