import React, { Component } from "react";
import "./SideBar.scss";
import logo from "../../assets/white-logo.png";
import defaultUser from "../../assets/User Icon.svg";
import { NavLink } from "react-router-dom";
import MyAccount from "../../icons/MyAccount";
import MarketplaceIcon from "../../icons/MarketplaceIcon";
import Basket from "../../icons/Basket";
import SellAlgoIcon from "../../icons/SellAlgoIcon";
import MyAlgosIcon from "../../icons/MyAlgosIcon";
import SupportIcon from "../../icons/SupportIcon";
import LogOutIcon from "../../icons/LogOutIcon";
import axios from "axios";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
  componentDidMount() {
    var userId = localStorage.getItem("userId");
    axios.get("/fetch_user_details").then((response) => {
      let data = response.data;
      console.log("userdata", data);
      this.setState({ userInfo: data.result });
    });
  }
  render() {
    return (
      <div className="__SideBar-Wrapper">
        <div className="__SideBar __col __scrollbar">
          <img
            src={logo}
            alt=""
            className="__main-logo  __mt-25 __ml-a __mr-a"
          />
          <div className="__flex-center __flex __mb-25 __mt-25">
            <img src={defaultUser} alt="" className="__default-user __mr-1" />
            <div>
              <div className="__h4">
                Hello &nbsp;
                {this.state.userInfo.current_user_first_name}
              </div>
              <div className="__sub-title __seconday-text">
                {this.state.userInfo.current_user_name}
              </div>
            </div>
          </div>
          <NavLink exact to="/my-account">
            <MyAccount /> My Account
          </NavLink>
          <div className="__ml-3 __mt-2 __sub-title __seconday-text __mb-1">
            Buy Algos
          </div>
          <NavLink to="/marketplace">
            <MarketplaceIcon className="__mediam-icon" /> Marketplace
          </NavLink>
          <NavLink to="/my-purcheses">
            <Basket /> My Purcheses
          </NavLink>
          <div className="__ml-3 __mt-2 __seconday-text __sub-title __mb-1">
            Sell Algos
          </div>
          <NavLink to="/sell-an-algo">
            <SellAlgoIcon /> Sell An Algo
          </NavLink>
          <NavLink to="/my-algos/" className="__mb-4">
            <MyAlgosIcon /> My Algos
          </NavLink>
          <NavLink to="/help" className="__mt-a">
            <SupportIcon />
            Help & Support
          </NavLink>
          <NavLink to="/logout">
            <LogOutIcon />
            Log Out
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SideBar;
