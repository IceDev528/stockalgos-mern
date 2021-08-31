import React, { Component } from "react";
import StockAlgoItem from "../StockAlgoItem/StockAlgoItem";
import WriteAReview from "../WriteAReview/WriteAReview";

class MyPurchaseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseAlgos: [],
      reviewStatus: false,
    };
    this.reviewChanged = this.reviewChanged.bind(this);
  }
  reviewChanged(props) {
    this.props.reviewStatus();
  }
  render() {
    return (
      <div>
        <div className="__small __dark-grey-text __mb-15">
          {this.props.date}
        </div>
        <StockAlgoItem {...this.props} />
        <div className="__view-source-file"></div>
        {!this.props.reviewed && (
          <WriteAReview {...this.props} onClick={this.reviewChanged} />
        )}
      </div>
    );
  }
}

export default MyPurchaseItem;
