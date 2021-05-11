import { Slider } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  categoryValue,
  colorValue,
  priceValue,
  sizeValue,
  brandValue,
  genderValue
} from "../../../store/actions/filter";
import {
  uniqueCategory,
  uniqueColors,
  uniqueMinMaxPrice,
  uniqueSizes,
  uniqueBrand,
} from "../../../services";
import { Scrollbars } from "react-custom-scrollbars";

class SideFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceplace: [this.props.prices.min, this.props.prices.max],
      setfistprice: [this.props.prices.min, this.props.prices.max],
      gender: ["Man", "Women"],
      sidebarmenu: false,
      gender: "",
    };
    this.showfilter = this.showfilter.bind(this);
  }

  showfilter() {
    this.setState((prevState) => ({
      sidebarmenu: !prevState.sidebarmenu,
    }));
  }

  onClickColorFilter = (event, colors) => {
    var index = colors.indexOf(event.target.value);
    if (event.target.checked) {
      colors.push(event.target.value);
    } else {
      colors.splice(index, 1);
    }
    this.props.colorValue(colors);
  };

  onClickBrandFilter = (event, brands) => {
    var index = brands.indexOf(event.target.value);
    if (event.target.checked) {
      brands.push(event.target.value);
    } else {
      brands.splice(index, 1);
    }
    this.props.brandValue(brands);
  };

  onClickCategoryFilter(event, categorys) {
    var index = categorys.indexOf(event.target.value);
    if (event.target.checked) {
      categorys.push(event.target.value);
    } else {
      categorys.splice(index, 1);
    }
    this.props.categoryValue(categorys);
  }

  onClickSizeFilter(event, sizes) {
    var index = sizes.indexOf(event.target.value);
    if (event.target.checked) {
      sizes.push(event.target.value);
    } else {
      sizes.splice(index, 1);
    }
    this.props.sizeValue(sizes);
  }

  onClickGenderFilter(event, gender) {
    var index = gender.indexOf(event.target.value);
    if (event.target.checked) {
      gender.push(event.target.value);
    } else {
      gender.splice(index, 1);
    }
    this.props.genderValue(gender);
  }

  onChangePricePlace = (values) => {
    var maximumval = this.props.prices.max / 5;

    var value = {
      min: values["0"],
      max: values["1"],
    };
    if (value.min == 0) {
      value.min = 0;
    } else if (value.min > 0 && value.min <= 20) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 1)) / 20));
    } else if (value.min > 20 && value.min <= 40) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 2)) / 40));
    } else if (value.min > 40 && value.min <= 60) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 3)) / 60));
    } else if (value.min > 60 && value.min <= 80) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 4)) / 80));
    } else if (value.min > 80 && value.min <= 100) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 5)) / 100));
    } else {
      value.min = false;
    }

    if (value.max === 0) {
      value.max = 0;
    } else if (value.max > 0 && value.max <= 20) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 1)) / 20));
    } else if (value.max > 20 && value.max <= 40) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 2)) / 40));
    } else if (value.max > 40 && value.max <= 60) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 3)) / 60));
    } else if (value.max > 60 && value.max <= 80) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 4)) / 80));
    } else if (value.max > 80 && value.max <= 100) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 5)) / 100));
    } else {
      value.max = false;
    }
    this.setState({
      priceplace: values,
    });
    this.props.priceValue({ value });
  };
  fncl = (value) => {
    return Number.parseFloat(value).toFixed(0);
  };
  convertValue = (labelValue) => {
    return labelValue.toLocaleString("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  toolformatter = (value) => {
    var maximumval = this.props.prices.max / 5;
    if (value === 0) {
      value = "0";
    } else if (value > 0 && value <= 20) {
      value = (value * (maximumval * 1)) / 20;
    } else if (value > 20 && value <= 40) {
      value = (value * (maximumval * 2)) / 40;
    } else if (value > 40 && value <= 60) {
      value = (value * (maximumval * 3)) / 60;
    } else if (value > 60 && value <= 80) {
      value = (value * (maximumval * 4)) / 80;
    } else if (value > 80 && value <= 100) {
      value = (value * (maximumval * 5)) / 100;
    }
    return this.convertValue(value);
  };

  clearprice(pricesval) {
    var value = {
      min: pricesval.min,
      max: pricesval.max,
    };
    this.setState({
      priceplace: [this.props.prices.min, this.props.prices.max],
    });
    this.props.priceValue({ value });
  }
  // Clear Color Filter Code
  clearcolor() {
    var colors = [];
    this.props.colorValue(colors);
  }
  // Clear Category Filter Code
  clearcategory() {
    var categorys = [];
    this.props.categoryValue(categorys);
  }
  // Clear Size Filter Code
  clearsize() {
    var sizes = [];
    this.props.sizeValue(sizes);
  }
  render() {
    var max = this.props.prices.max;
    var maxdivide = max / 5;
    const marks = {
      0: 0,
      20: (maxdivide * 1).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      40: (maxdivide * 2).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      60: (maxdivide * 3).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      80: (maxdivide * 4).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      100: max.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
    };
    const sizeFilterValues = this.props.filters.size;
    const genderFilterValues = this.props.filters.gender;
    const categoryFilterValues = this.props.filters.category;
    const colorsFilterValues = this.props.filters.color;
    const brandsFilterValues = this.props.filters.brand;
    const gendersFilterValues = this.props.filters.gender;

    return (
      <div>
        <div className="widget widget_price_filter">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Price</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearprice(this.props.prices)}
              >
                Clear
              </a>
            </p>
          </div>
          <div classs="shop-filter shop-filter-product-price widget_price_filter filterbg">
            <div className="shop-filter-wrapper">
              <div className="price_slider_wrapper">
                <Slider
                  range
                  step={1}
                  min={0}
                  max={100}
                  tipFormatter={this.toolformatter}
                  value={this.state.priceplace}
                  onChange={this.onChangePricePlace}
                  marks={marks}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Color</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearcolor()}
              >
                Clear
              </a>
            </p>
          </div>

          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "210px" }}
          >
            <Scrollbars>
              <ul
                className="pgs-widget-layered-nav-list"
                tabIndex={0}
                style={{ right: "-17px" }}
              >
                {this.props.colors.map((color, index) => {
                  return (
                    <div className="form-check pgs-filter-checkbox" key={index}>
                      <input
                        type="checkbox"
                        onClick={(e) =>
                          this.onClickColorFilter(e, colorsFilterValues)
                        }
                        value={color}
                        defaultChecked={
                          colorsFilterValues.includes(color) ? true : false
                        }
                        className="form-check-input"
                        id={color}
                      />
                      <label className="form-check-label" htmlFor={color}>
                        {color}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </Scrollbars>
          </div>
        </div>
        {!this.props.compareBrand && (
          <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="widget-title">Filter by Brands</h4>
              <p>
                <a
                  className="price-clear-filter"
                  onClick={() => this.clearcolor()}
                >
                  Clear
                </a>
              </p>
            </div>

            <div
              className="pgs-widget-layered-nav-list-container has-scrollbar"
              style={{ height: "210px" }}
            >
              <Scrollbars>
                <ul
                  className="pgs-widget-layered-nav-list"
                  tabIndex={0}
                  style={{ right: "-17px" }}
                >
                  {this.props.brands.map((brand, index) => {
                    return (
                      <div
                        className="form-check pgs-filter-checkbox"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          onClick={(e) =>
                            this.onClickBrandFilter(e, brandsFilterValues)
                          }
                          value={brand}
                          defaultChecked={
                            brandsFilterValues.includes(brand) ? true : false
                          }
                          className="form-check-input"
                          id={brand}
                        />
                        <label className="form-check-label" htmlFor={brand}>
                          {brand}
                        </label>
                      </div>
                    );
                  })}
                </ul>
              </Scrollbars>
            </div>
          </div>
        )}

        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Categories</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearcategory()}
              >
                Clear
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "215px" }}
          >
            <Scrollbars>
              {this.props.categorys.map((category, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.onClickCategoryFilter(e, categoryFilterValues)
                      }
                      value={category}
                      defaultChecked={
                        categoryFilterValues.includes(category) ? true : false
                      }
                      className="form-check-input"
                      id={category}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>
        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Size</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearsize()}
              >
                Clear
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "215px" }}
          >
            <Scrollbars>
              {this.props.sizes.map((size, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.onClickSizeFilter(e, sizeFilterValues)
                      }
                      value={size}
                      defaultChecked={
                        sizeFilterValues.includes(size) ? true : false
                      }
                      className="form-check-input"
                      id={size}
                    />
                    <label className="form-check-label" htmlFor={size}>
                      {size}
                    </label>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>


        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Gender</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearGender()}
              >
                Clear
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "215px" }}
          >
            <Scrollbars>
              {this.props.genders.map((gender, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.onClickGenderFilter(e, gendersFilterValues)
                      }
                      value={gender}
                      defaultChecked={
                        gendersFilterValues.includes(gender) ? true : false
                      }
                      className="form-check-input"
                      id={gender}
                    />
                    <label className="form-check-label" htmlFor={gender}>
                      {gender}
                    </label>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>

        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const product = ownProps.compareBrand
    ? state.data.selectedBrandsProduct
    : state.data.products;
  return {
    categorys: uniqueCategory(product),
    sizes: uniqueSizes(product),
    colors: uniqueColors(product),
    prices: uniqueMinMaxPrice(product),
    brands: uniqueBrand(product),
    genders: ["men", "women"],
    filters: state.filters,
  };
};
export default connect(mapStateToProps, {
  categoryValue,
  sizeValue,
  colorValue,
  priceValue,
  brandValue,
  genderValue
})(SideFilter);
