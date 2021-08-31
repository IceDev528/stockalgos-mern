import React, { Component } from "react";
import SideBar from "../../components/SideBar/SideBar";
import BellSolid from "../../icons/BellSolid";
import Select from "../../ui/Select/Select";
import chart from "../../assets/Mask.png";
import "./MyPurchasesPage.scss";
import MyPurchaseItem from "../../components/MyPurchaseItem/MyPurchaseItem";
import axios from "axios";

class MyPurchasesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseAlgos: [],
      reviewStatus: false,
    };
    this.reviewStatus = this.reviewStatus.bind(this);
  }

  fetchAllPurchaseAlgos(userId) {
    axios.get("/myPurchases/" + userId).then((response) => {
      this.setState({ purchaseAlgos: response.data.data });
      console.log("purchaseAlgos", this.state.purchaseAlgos);
    });
  }
  reviewStatus() {
    this.setState({ reviewStatus: true });
    const userId = localStorage.getItem("userId");
    this.fetchAllPurchaseAlgos(userId);
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.fetchAllPurchaseAlgos(userId);
  }
  render() {
    return (
      <div className="__flex-stretch">
        <SideBar />
        <div className="__f1 __m-4 __My-Purchases-Page">
          <div className="__flex __sb __h2">
            <div className="__bolder __primary-text-darken-1">My Purchases</div>
            <BellSolid className="__primary-text" />
          </div>
          <Select className="__mb-25 __mt-35" value="New" title="Sort by">
            <option value="Relevancy">Relevancy</option>
            <option value="BestSelling">BestSelling</option>
            <option value="Top Rated">Top Rated</option>
            <option value="New">New</option>
            <option value="Price High to Low">Price High to Low</option>
            <option value="Price Low To High">Price Low To High</option>
          </Select>
          <div className="__wrap __purchase-items">
            {this.state.purchaseAlgos.map((val, index) => {
              return (
                <MyPurchaseItem
                  key={index}
                  algoId={val.algoId._id}
                  to={"/marketplace/" + val.algoId._id}
                  chart={val.algoId.image}
                  title={val.algoId.stockAlgoName}
                  tags={val.algoId.tags}
                  username={val.userId.name}
                  price={val.algoId.priceDetails.price}
                  ratings={val.review}
                  reviewStatus={this.reviewStatus}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPurchasesPage;
