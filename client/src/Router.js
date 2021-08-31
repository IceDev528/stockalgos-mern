import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import App from "./App";
import Home from "./live/home";
import Correlation from "./live/correlation";
import Rsi from "./live/rsi";
import Login from "./live/login";
import Register from "./live/register";
import SignUpPage from "./live/SignUpPage";
import ForgotPasswordPage from "./live/ForgotPasswordPage";
import MarketPlacePage from "./live/MarketPlacePage/MarketPlacePage";
import ProductPage from "./live/ProductPage/ProductPage";
import MyPurchasesPage from "./live/MyPurchasesPage/MyPurchasesPage";
import LogOut from "./live/logout";
import MyAccountPage from "./live/MyAccountPage/MyAccountPage";
import SellAnAlgoPage from "./live/SellAnAlgoPage/SellAnAlgoPage";
import MyAlgosPage from "./live/MyAlgosPage/MyAlgosPage";

const LoginRoute = ({ component: Component, ...rest }) => {
  console.log(Component);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !rest.isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/marketPlace",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  setLogin = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };
  setLogout = (isLoggedIn) => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <App setLogin={(logIn) => this.setLogin(logIn)}>
        <BrowserRouter>
          <Switch>
            <LoginRoute
              exact
              {...this.state}
              path="/"
              component={Login}
              setLogin={(value) => this.setLogin(value)}
            />
            <LoginRoute
              exact
              {...this.state}
              path="/login"
              component={Login}
              setLogin={(value) => this.setLogin(value)}
            />
            <Route path="/correlation" component={Correlation} />
            <Route path="/rsi" component={Rsi} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <PrivateRoute
              exact
              {...this.state}
              path="/marketplace"
              component={MarketPlacePage}
            />
            <Route path="/marketplace/:id" component={ProductPage} />
            <Route
              path="/logout"
              render={(props) => (
                <LogOut
                  {...props}
                  setLogOut={(value) => this.setLogout(value)}
                />
              )}
            />
            <Route exact path="/my-purcheses" component={MyPurchasesPage} />
            <Route
              path="/my-purcheses/:id"
              render={(props) => <ProductPage {...props} isPurchased={true} />}
            />
            <Route
              exact
              path="/my-algos"
              render={(props) => <MyAlgosPage {...props} isMyAlgo={true} />}
            />
            {/* <Route
              path="/my-algos/:id"
              render={(props) => <MyAlgosPage {...props} isMyAlgo={true} />}
            /> */}

            <Route path="/my-account" component={MyAccountPage} />
            <Route path="/sell-an-algo" component={SellAnAlgoPage} />
          </Switch>
        </BrowserRouter>
      </App>
    );
  }
}

export default Router;
