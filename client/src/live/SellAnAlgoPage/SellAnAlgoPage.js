import React, { Component, useState, useRef, Fragment } from "react";
import "./SellAnAlgoPage.scss";
import BellSolid from "../../icons/BellSolid";
import SideBar from "../../components/SideBar/SideBar";
import InputFile from "../../ui/InputFile/InputFile";
import HeaderSideBar from "../../components/HeaderSideBar/HeaderSideBar";
import axios from "axios";

class SellAnAlgoPage extends Component {
  validation = (elm, length = 3, defferentCondition = false) => {
    if (elm.value.trim().length >= length || defferentCondition)
      elm.classList.contains("__empty") && elm.classList.remove("__empty");
    else {
      this.isFormFilled = false;
      elm.classList.add("__empty");
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    // Validation
    this.isFormFilled = true;
    const {
      name,
      image,
      description,
      howToUse,
      tags,
      price,
      sourcecode,
    } = e.target;
    this.validation(name);
    this.validation(description, 50);
    this.validation(howToUse, 50);
    this.validation(tags, 100, tags.values.length >= 1);
    this.validation(image);
    this.validation(sourcecode);

    let purchase = null;
    const userId = localStorage.getItem("userId");
    const arrtags = Object.values(tags.values);
    var imageUrl = "";
    var sourceUrl = "";

    for (var i = 0, length = price.length; i < length; i++) {
      if (price[i].checked) {
        purchase = price[i].purchase;
        this.validation(price[i], 100, +purchase.price > 9);
        break;
      }
    }
    console.log("purchase", purchase);
    if (!this.isFormFilled) return;

    // storing data into one object
    let product = new FormData();
    let productImage = new FormData();
    let algoSourceCode = new FormData();

    product.append("userId", userId);
    product.append("stockAlgoName", name.value);
    productImage.append("profileImage", image.files[0]);
    product.append("description", description.value);
    product.append("howToUse", howToUse.value);
    product.append("tags", arrtags);
    product.append("priceDetails", purchase);
    algoSourceCode.append("sourceCode", sourcecode.files[0]);

    await axios
      .post("/profile-img-upload", productImage, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${productImage._boundary}`,
        },
      })
      .then((response) => {
        if (200 === response.status) {
          // If file size is larger than expected.
          if (response.data.error) {
            if ("LIMIT_FILE_SIZE" === response.data.error.code) {
              alert("Max size: 2MB", "red");
            } else {
              console.log(response.data);
              // If not the given file type
              alert(response.data.error, "red");
            }
          } else {
            // Success
            let fileName = response.data;

            console.log("filedata", fileName);

            alert("File Uploaded", fileName.position);

            // product.append('image', fileName.location);
            imageUrl = fileName.location;
          }
        }
      })
      .catch((error) => {
        // If another error
        alert(error, "red");
      });

    //algorithm sourceFile upload
    await axios
      .post("/algo-source-upload", algoSourceCode, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${algoSourceCode._boundary}`,
        },
      })
      .then((response) => {
        if (200 === response.status) {
          // If file size is larger than expected.
          if (response.data.error) {
            if ("LIMIT_FILE_SIZE" === response.data.error.code) {
              alert("Max size: 2MB", "red");
            } else {
              console.log(response.data);
              // If not the given file type
              alert(response.data.error, "red");
            }
          } else {
            // Success
            let fileName = response.data;

            console.log("filedata", fileName);
            alert("source file uploaded", fileName.position);
            sourceUrl = fileName.location;
            // product.append('algorithmSourceFileUrl', fileName.location);
          }
        }
      })
      .catch((error) => {
        // If another error
        alert(error, "red");
      });
    let productjsonObject = {};

    for (const [key, value] of product.entries()) {
      productjsonObject[key] = value;
    }
    console.log("productjsonObject", productjsonObject);

    const productData = {
      userId: userId,
      image: imageUrl,
      stockAlgoName: name.value,
      description: description.value,
      howToUse: howToUse.value,
      tags: arrtags,
      priceDetails: purchase,
      algorithmSourceFileUrl: sourceUrl,
    };

    axios.post("/algos/save", productData).then((response) => {
      console.log("success", response);
      if (response.data.message == "success")
        alert("Algo Data Saved Correctly");
    });
  };
  componentDidMount() {
    console.log("userId", localStorage.getItem("userId"));
  }
  render() {
    return (
      <HeaderSideBar
        title="Sell an Algo"
        addMargin={false}
        className="__Sell-An-Algo-Page"
      >
        <div className="__inline-block">
          <div className="__mt-s __dark-grey-text __mb-4">
            Have a stock algorithm you want to sell? Fill out the fields below,
            submit your algo, and start earning money as soon as it’s approved!
          </div>
          <form className="__flex-stretch" onSubmit={this.onSubmit}>
            <div className="__form-left-panel __f1">
              <label className="__mb-3 __block">
                <div className="__h4 __bold __mb-1">Name of Stock Algo</div>
                <input className="__input-field-small __input" name="name" />
                <div className="__alert">
                  Name must be minimum 3 characters long!
                </div>
              </label>
              <div className="__h4 __mb-1 __bold">Image</div>
              <InputFile
                accept="image/x-png,image/gif,image/jpeg"
                className="__mb-3"
                onChange={(e) => console.log(e)}
                name="image"
              />
              <label className="__mb-2 __block">
                <div className="__h4 __bold __mb-1">Description</div>
                <textarea
                  className="__input-field-small __input"
                  rows="5"
                  name="description"
                  placeholder="What is the purpose of this algo?…"
                ></textarea>
                <div className="__small __dark-grey-text __right">
                  Min. 50 characters
                </div>
              </label>
              <label className="__block">
                <div className="__h4 __bold __mb-1">How To Use</div>
                <textarea
                  name="howToUse"
                  className="__input-field-small __input"
                  rows="5"
                  placeholder="How would someone use this algo?…"
                ></textarea>
                <div className="__small __dark-grey-text __right">
                  Min. 50 characters
                </div>
              </label>
            </div>
            <div className="__mb-a __right-form-part __f1 __mr-1">
              <div>
                <div className="__h4 __bold __mb-1">Tags</div>
                <SelectTag
                  name="tags"
                  onChange={(elm) => console.log(elm.values)}
                />
              </div>
              <div className="__mt-3 __mb-25">
                <div className="__h4 __bold">Price</div>
                <div className="__dark-grey-text __small __mt-sm">
                  You’ll keep 90% of your earnings. The other 10% <br /> helps
                  cover customer support and web maintenance.
                </div>
                <PriceInput
                  value="One-time purchase"
                  name="price"
                  onChange={(e, purchaseType) => console.log(e, purchaseType)}
                  checked
                />
                <PriceInput
                  value="Monthly subscription"
                  name="price"
                  onChange={(e, purchaseType) => console.log(e, purchaseType)}
                />
              </div>
              <div>
                <div className="__h4 __bold">Upload Algorithm Source File</div>
                <div className="__dark-grey-text __small __mt-sm __mb-15">
                  Acceptable formats: HTML, CSS, C++, <br /> Javascript, Go,
                  Node, React, and Python
                </div>
                <InputFile name="sourcecode" onChange={(e) => console.log(e)} />
              </div>
              <div className="__flex-stretch __mt-3">
                <div>
                  <button className="__btn __pl-3 __pr-3">
                    Submit for Approval
                  </button>
                  <div className="__small __mt-s __dark-grey-text">
                    An algo typically takes 5-10 business <br /> days to be
                    reviewed and approved
                  </div>
                </div>
                <div
                  className="__green-text __ml-2 __mt-s __pointer"
                  onClick={this.props.history.goBack}
                >
                  Cancel
                </div>
              </div>
            </div>
          </form>
        </div>
      </HeaderSideBar>
    );
  }
}

class SelectTag extends Component {
  state = {
    tags: [
      { tag: "#forex", active: false },
      { tag: "#future", active: false },
      { tag: "#options", active: false },
      { tag: "#ETF", active: false },
      { tag: "#signal", active: false },
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
        <div className="__wrap __chips __sb __select-tags">
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
        <div className="__alert __mt-1">Please select at least one tag</div>
      </Fragment>
    );
  }
  componentDidMount = () => (this.refs.input.values = []);
}

class PriceInput extends Component {
  state = {
    ...this.props,
  };
  onChange = (e) => {
    const { value } = e.target;
    const { onChange } = this.state;
    if (+value > 0 || value === "") {
      this.refs.input.purchase = {
        price: value,
        type: this.state.value,
      };
      this.setState({ price: value });
      onChange && onChange(e, value);
    }
  };
  render() {
    const { value, price, checked, name } = this.state;
    const eightper = (price ? (90 / 100) * price : 0).toFixed(2);
    return (
      <label className="__flex-stretch __mt-1 __price-input-container">
        <input
          type="radio"
          name={name}
          value={value}
          className="__input-field-radio"
          defaultChecked={checked}
          ref="input"
        />
        <div className="__ml-1 __input-details">
          <div className="__bold __mb-s">{value}</div>
          <div className="__flex __price-details">
            <input
              className="__price-input-field __input-field-small __input"
              ref="__price"
              type="number"
              value={price}
              onChange={this.onChange}
            />
            <span
              className={`__small __dark-grey-text __ml-sm __mr-2 ${
                value === "One-time purchase" ? "__hide" : ""
              }`}
            >
              /month
            </span>
            <div>
              <span className="__small __dark-grey-text">
                What you’ll earn <br />{" "}
                {value === "One-time purchase" ? "per sale" : "per month"}:
              </span>{" "}
              {eightper > 0 && `$${eightper}`}
            </div>
          </div>
          <div className="__alert">Price must be minimum $10</div>
        </div>
      </label>
    );
  }
  componentDidMount = () => {
    this.refs.input.purchase = {
      price: this.state.price || 0,
      type: this.state.value,
    };
  };
}

export default SellAnAlgoPage;
