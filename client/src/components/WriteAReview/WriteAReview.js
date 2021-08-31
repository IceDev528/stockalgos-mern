import React, { Component, Fragment } from "react";
import PopUp from "../../ui/PopUp/PopUp";
import RatingStars from "../RatingStars/RatingStars";
import { withRouter } from "react-router-dom";

import axios from "axios";

class WriteAReview extends Component {
  state = {
    isReviewPopUp: false,
    product: { ...this.props },
    isPopUp: false,
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { ratings, review, headline } = e.target;
    const userId = localStorage.getItem("userId");

    var reviewData = {
      userId: userId,
      algoId: this.state.product.algoId,
      reviewTitle: review.value,
      reviewDescription: headline.value,
      rating: ratings.value,
    };
    axios.post("/algos/review/save", reviewData).then((response) => {
      console.log("success", response);
      alert("Added review");
      this.setState({ isPopUp: false });
      this.props.onClick();
      // this.props.history.push("/my-purcheses");
      // this.props.history.go(0);
    });
  };
  render() {
    const { product, isPopUp } = this.state;
    return (
      <Fragment>
        <div
          className="__green-text __center __mt-1 __mb-4"
          onClick={() => this.setState({ isPopUp: true })}
        >
          Write a review
        </div>
        {isPopUp && (
          <PopUp
            className="__left"
            close={() => this.setState({ isPopUp: false })}
          >
            <form onSubmit={this.onSubmit}>
              <div className="__h3 __mb-15 __light-bold">Rate & Review</div>
              <div className="__flex-stretch">
                <img src={product.chart} height="74" />
                <div className="__ml-2">
                  <div className="__bold __mb-sm">{product.title}</div>
                  <div className="__small __dark-grey-text">
                    {product.username}
                  </div>
                </div>
              </div>
              <label>
                <div className="__bold __mb-sm __mt-15">
                  Rate this stock algo
                </div>
                <RatingStars
                  isInput={true}
                  onChange={(elm) => console.log(elm)}
                  name="ratings"
                />
                <div className="__bold __mb-sm __mt-1">Write a review</div>
                <textarea
                  className="__input-field-small __input"
                  rows="4"
                  cols="50"
                  name="review"
                ></textarea>
                <div className="__small __dark-grey-text __right">
                  Min. 50 characters
                </div>
              </label>

              <label>
                <div className="__mb-sm __mt-sm">
                  <span className="__bold __pr-sm">Headline</span>
                  <span className="__small __dark-grey-text">optional</span>
                </div>
                <input
                  type="text"
                  className="__input-field-small __input"
                  name="headline"
                />
                <div className="__small __dark-grey-text __right __mb-2">
                  Min. 50 characters
                </div>
              </label>
              <button className="__btn __large-btn __m-a">Submit</button>
            </form>
          </PopUp>
        )}
      </Fragment>
    );
  }
}

export default withRouter(WriteAReview);
