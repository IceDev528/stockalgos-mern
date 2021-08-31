import React, { Component, Fragment } from "react";
import "./ProductPaymentPanel.scss";
import BellSolid from "../../icons/BellSolid";
import FileIcon from "../../icons/FileIcon";
import StripePaymentPopup from "../../components/StripePaymentPopup/StripePaymentPopup";
import EditIcon from "../../icons/EditIcon";
import VisaCard from "../../assets/cc-visa-brands.png";
import ConfirmPaymentPopUp from "../../components/ConfirmPaymentPopUp/ConfirmPaymentPopUp";
import WriteAReview from "../../components/WriteAReview/WriteAReview";
import chart from "../../assets/Mask.png";
import CancelSubScriptionPopUp from "../../components/CancelSubScriptionPopUp/CancelSubScriptionPopUp";
import RemoveAlgoPopUp from "../../components/RemoveAlgoPopUp/RemoveAlgoPopUp";

class ProductPaymentPanel extends Component {
  componentDidMount() {
    console.log("ff", this.props);
  }
  state = {
    isPaymentPopUp: false,
    card: null,
    paymentMethodReq: null,
    isConfirmPaymentPopup: false,
    isSubscriptionBase: true,
    isSubscriptionPopUp: false,
    ...this.props,
    isRemoveAlgoPopUp: false,
  };

  showPaymentPopUp = () => this.setState({ isPaymentPopUp: true });
  hidePaymentPopUp = () => this.setState({ isPaymentPopUp: false });
  onSubmit = (payload) => {
    this.setState({
      isPaymentPopUp: false,
      card: payload.paymentMethod.card,
      paymentMethodReq: payload,
    });
  };
  onConfirmation = () =>
    this.setState({ isConfirmPaymentPopup: false, isPurchased: true });
  showConfirmPaymentPopUp = () =>
    this.setState({ isConfirmPaymentPopup: true });
  hideConfirmPaymentPopUp = () =>
    this.setState({ isConfirmPaymentPopup: false });
  showSubscriptionPopUp = () => this.setState({ isSubscriptionPopUp: true });
  hideSubscriptionPopUp = () => this.setState({ isSubscriptionPopUp: false });
  showRemoveAlgoPopUp = () => this.setState({ isRemoveAlgoPopUp: true });
  hideRemoveAlgoPopUp = () => this.setState({ isRemoveAlgoPopUp: false });
  render() {
    const {
      isPaymentPopUp,
      card,
      paymentMethodReq,
      isConfirmPaymentPopup,
      isPurchased,
      isReviewed,
      isSubscriptionBase,
      isSubscriptionPopUp,
      isMyAlgo,
      myAlgo,
      isRemoveAlgoPopUp,
    } = this.state;

    return (
      <Fragment>
        {isRemoveAlgoPopUp && (
          <RemoveAlgoPopUp close={this.hideRemoveAlgoPopUp} />
        )}
        {isPaymentPopUp && (
          <StripePaymentPopup
            onSubmit={this.onSubmit}
            close={this.hidePaymentPopUp}
          />
        )}
        {isConfirmPaymentPopup && (
          <ConfirmPaymentPopUp
            algoData={myAlgo._id}
            card={card}
            paymentMethodReq={paymentMethodReq}
            price={this.props.priceDetail.price}
            onConfirmation={this.onConfirmation}
            close={this.hideConfirmPaymentPopUp}
          />
        )}
        {isSubscriptionPopUp && (
          <CancelSubScriptionPopUp close={this.hideSubscriptionPopUp} />
        )}
        <div className="__Product-Payment-Panel __center">
          <div className="__lightgrey-2 __payment-wrapper __scrollbar __p-4 __col __sb">
            <div className={isPurchased ? "__col __f1" : ""}>
              <div className="__h2 __mb-2">
                <BellSolid className="__right __block __ml-a __primary-text" />
              </div>
              <div className="__card">
                <FileIcon className="__ml-a __mr-a __block __big-title __mt-s __mb-s" />
              </div>
              <div className="__mt-sm __mb-a">
                <div className="__light-bold __card __relative __p-12">
                  titleofstockalgo.hmtl
                </div>
                {isPurchased && (
                  <div className="__view-source-file __large-view-source-file"></div>
                )}
                {isPurchased && !isReviewed && (
                  <WriteAReview
                    title="Stock Algo A"
                    username="@janedoh321"
                    chart={chart}
                  />
                )}
                {isPurchased && isSubscriptionBase && (
                  <div>
                    <div className="__sub-title __left __dark-grey-text __mb-15">
                      Your subscription renews on the 14th of every month. If
                      you cancel your subscription at any point afterwards, you
                      will be charged for the subsequent month.
                    </div>
                    <button
                      className="__btn __green-text __large-btn"
                      onClick={this.showSubscriptionPopUp}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                )}
              </div>
              <div className="__card __mt-2">
                <div className="__small __dark-grey-text __mb-sm">
                  {this.props.priceDetail.type}
                </div>
                <div className="__h3 __bold">
                  ${this.props.priceDetail.price}
                </div>
              </div>
              {isMyAlgo && (
                <div className="__dark-grey-text __mt-2 __mb-4">
                  <div className="__mb-1">10 purchases</div>
                  <div>Approved May 20, 2020</div>
                </div>
              )}
            </div>
            {isMyAlgo && (
              <div className="__flex __mt-a">
                <button
                  className="__f1 __btn __mr-1"
                  onClick={this.showRemoveAlgoPopUp}
                >
                  Remove
                </button>
                <button className="__f1 __btn __green-text">Edit</button>
              </div>
            )}
            <div className="__col">
              {card && (
                <div className="__card __flex __p-s __mt-4">
                  <img src={VisaCard} alt="" />
                  <div className="__ml-s">
                    <div className="__small __dark-grey-text ">Payment</div>
                    <div className="__mt-sm">Visa **** {card.last4}</div>
                  </div>
                  <EditIcon
                    className="__grey-text __ml-a __pointer"
                    onClick={this.showPaymentPopUp}
                  />
                </div>
              )}
              {!card && !isMyAlgo && !isPurchased && (
                <button
                  onClick={this.showPaymentPopUp}
                  className="__btn __p-s __flex __mt-a __p-sm __mt-4"
                >
                  <span className="__f1">Add Payment</span>{" "}
                  <span className="__h1 __ml-a __mr-sm">+</span>
                </button>
              )}
              {!isPurchased && !isMyAlgo && (
                <button
                  className="__p-sm  __mt-2 __btn __flex"
                  disabled={card ? false : true}
                  onClick={this.showConfirmPaymentPopUp}
                >
                  <span className="__f1">Buy Algo</span>
                  <span className="__alogo-payment-card">
                    ${this.props.priceDetail.price}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductPaymentPanel;
