import React, { Component, Fragment } from "react";
import "./MarketPlacePage.scss";
import SideBar from "../../components/SideBar/SideBar";
import BellSolid from "../../icons/BellSolid";
import MagnifierGlass from "../../icons/MagnifierGlass";
import Select from "../../ui/Select/Select";
import StockAlgoItem from "../../components/StockAlgoItem/StockAlgoItem";
import chart from "../../assets/Mask.png";
import axios from "axios";

class SelectTag extends Component {
  state = {
    tags: [
      { tag: "#forex", active: false },
      { tag: "#future", active: false },
      { tag: "#options", active: false },
      { tag: "#ETF", active: false },
      { tag: "#screener", active: false },
      { tag: "#signal", active: false },
    ],
  };
  onClick = (index) => {
    const tags = this.state.tags;
    tags[index].active = !tags[index].active;

    const selectedTags = [];
    tags.forEach(({ tag, active }) => active && selectedTags.push(tag));
    this.refs.input.values = selectedTags;

    this.setState({ tags });
    this.props.onChange && this.props.onChange(this.refs.input);
  };
  render() {
    return (
      <Fragment>
        <input
          type="hidden"
          name={this.props.name}
          ref="input"
          className="__input-field-small"
        />
        <div className="__wrap __chips __sb">
          {this.state.tags.map(({ tag, active }, index) => (
            <span
              className={`__chip ${active ? "__primary" : ""}`}
              key={index}
              onClick={() => this.onClick(index)}
            >
              {tag}
            </span>
          ))}
        </div>
      </Fragment>
    );
  }
  componentDidMount = () => (this.refs.input.values = []);
}

class MarketPlacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algos: [],
    };
  }
  fetchAllAlgos() {
    axios.get("/algos").then((response) => {
      this.setState({ algos: response.data.data });
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { search, tags } = e.target;
    const data = {
      search: search.value,
      tags: tags.values,
    };
    if (data.search == "" && data.tags.length == 0) {
      this.fetchAllAlgos();
    } else {
      axios.post("/marketplace/search", data).then((response) => {
        console.log("success", response);
        this.setState({ algos: response.data.data });
      });
    }
  };
  componentDidMount() {
    this.fetchAllAlgos();
  }
  render() {
    return (
      <div className="__flex-stretch">
        <SideBar />
        <div className="__MarketPlace-Page __m-4 __f1">
          <div className="__flex __sb __h2">
            <div className="__bolder __primary-text-darken-1">Marketplace</div>
            <BellSolid className="__primary-text" />
          </div>
          <div className="__flex __mt-25">
            <form className="__flex-stretch" onSubmit={this.onSubmit}>
              <div>
                <div className="__flex">
                  <div className="__flex __f1">
                    <label className=" __lightgrey-2 __flex __search-box __f1 __pl-sm __pr-sm">
                      <MagnifierGlass className="__grey-text __m-sm" />
                      <input
                        type="text"
                        autoComplete="off"
                        name="search"
                        className="__input __f1"
                        placeholder="Search stock algorithms"
                      />
                    </label>
                    <button className="__btn __search-box-button">
                      Search
                    </button>
                  </div>
                </div>
                <div className="__flex __market-place-chips __mt-1">
                  <SelectTag
                    name="tags"
                    onChange={(elm) => console.log(elm.values)}
                  />
                </div>
              </div>
              <Select value="Relevancy" title="Sort by" className="__ml-3">
                <option value="Relevancy">Relevancy</option>
                <option value="BestSelling">BestSelling</option>
                <option value="Top Rated">Top Rated</option>
                <option value="New">New</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Price Low To High">Price Low To High</option>
              </Select>
            </form>
          </div>
          <main>
            <div className="__grey-text __small __mt-35 __mb-3">
              {this.state.algos.length} Results
            </div>
            <div className="__wrap __marketplace-stock-algos">
              {this.state.algos.map((val, index) => {
                return (
                  <StockAlgoItem
                    key={index}
                    to={"/marketplace/" + val._id}
                    chart={val.image}
                    title={val.stockAlgoName}
                    username={val.userId.name}
                    price={val.priceDetails.price}
                    ratings={val.review}
                    tags={val.tags}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default MarketPlacePage;
