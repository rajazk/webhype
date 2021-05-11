import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
// import { products } from "../utilities/constants";
import { ToastContainer, toast } from "react-toastify";
import {
  getSelectedProductList,
  addToCompareItems,
} from "../../store/actions/actions";

function ProductSlider(props) {
  const settings = props.settings;

  function AddToCompare(
    ProductID,
    MainBrand,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus,
    addProduct
  ) {
    props.addToCompareItems();
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));

    if (Cart == null) Cart = new Array();
    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );

    if (Cart && Cart.length < 4) {
      if (selectedProduct == null) {
        Cart.push({
          ProductID,
          MainBrand,
          ProductName,
          ProductImage,
          Qty,
          Rate,
          StockStatus,
          ProductData: addProduct,
        });
        localStorage.removeItem("LocalCartItems");
        localStorage.setItem("LocalCartItems", JSON.stringify(Cart));
        props.getSelectedProductList();
        var flag = 0;
        if (flag == 0) {
          toast.success("Item Added to Compare");
          flag = 1;
        }
      } else {
        toast.warning("Item is already in Compare");
      }
    } else {
      toast.warning("product can not be added more than 4 items");
    }
  }

  function CheckCardItem(ID) {
    let checkcart = false;
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        if (cartItem.ProductID === ID) {
          checkcart = true;
        }
      }
    }
    return checkcart;
  }

  function CheckWishList(ID) {
    let wishlist = false;
    var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

    if (Wish && Wish.length > 0) {
      for (const wishItem of Wish) {
        if (wishItem.ProductID === ID) {
          wishlist = true;
        }
      }
    }
    return wishlist;
  }

  function AddToWishList(
    ProductID,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus
  ) {
    props.addToCompareItems();
    var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));
    if (Cart == null) Cart = new Array();

    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus,
      });
      localStorage.removeItem("LocalWishListItems");
      localStorage.setItem("LocalWishListItems", JSON.stringify(Cart));

      toast.success("Item Added to WishList");
    } else {
      toast.warning("Item is already in WishList");
    }
  }

  function rating(productrat) {
    let rat = [];
    let i = 1;
    while (i <= 5) {
      if (i <= productrat) {
        rat.push(<i className="fa fa-star" key={i} />);
      } else {
        rat.push(<i className="fa fa-star-o" key={i} />);
      }
      i += 1;
    }
    return rat;
  }

  const handleToast = () =>{
    toast.warning("Please login to add item in wishlist");
  }

  return (
    <Col sm={12}>
      <ToastContainer autoClose={1000} />
      <div className="products-listing-items-wrapper products-listing-carousel">
        <div
          className="products"
          data-nav-arrow="false"
          data-items={4}
          data-md-items={3}
          data-sm-items={3}
          data-xs-items={2}
          data-xx-items={1}
          data-space={20}
        >
          <Slider
            {...settings}
            className="slider-spacing-10 slider-arrow-hover"
          >
            {props.recommendedProduct.length > 0 &&
              props.recommendedProduct.map((product, index) => (
                <div className="item" key={index}>
                  <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
                    <div className="product-inner element-hovered">
                      <div className="product-thumbnail">
                        <div className="product-thumbnail-inner">
                          <Link to={`/shop/${product.category}/${product.id}`}>
                            {product.pictures[0] ? (
                              <div className="product-thumbnail-main">
                                <img
                                  src={product.pictures[0]}
                                  className="img-fluid"
                                />
                              </div>
                            ) : null}
                            {product.pictures[1] ? (
                              <div className="product-thumbnail-swap">
                                <img
                                  src={product.pictures[1]}
                                  className="img-fluid"
                                />
                              </div>
                            ) : null}
                          </Link>
                        </div>

                        <div className="product-actions">
                          <div className="product-actions-inner">
                            <div className="product-action product-action-add-to-cart">
                              {!CheckCardItem(product.id) ? (
                                <Link
                                  to={"#"}
                                  onClick={() =>
                                    AddToCompare(
                                      product.id,
                                      product.mainBrand,
                                      product.name,
                                      product.pictures[0],
                                      1,
                                      product.salePrice,
                                      "In Stock",
                                      product
                                    )
                                  }
                                  className="button add_to_cart_button"
                                  rel="nofollow"
                                >
                                  Add to compare
                                </Link>
                              ) : (
                                <Link
                                  to="/ShopingCart"
                                  className="button add_to_cart_button"
                                  rel="nofollow"
                                >
                                  View Cart
                                </Link>
                              )}
                            </div>
                            <div className="product-action product-action-wishlist">
                              {!CheckWishList(product.id) ? (
                                <Link
                                  to={"#"}
                                  onClick={() => {
                                    props.loggedIn
                                      ? AddToWishList(
                                          product.id,
                                          product.name,
                                          product.pictures[0],
                                          1,
                                          product.salePrice,
                                          "In Stock"
                                        )
                                      : handleToast()
                                  }}
                                  className="add_to_wishlist"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  Add to Wishlist
                                </Link>
                              ) : (
                                <Link
                                  to="/wishlist"
                                  className="add_to_wishlist_fill"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  View Wishlist
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <span className="webhype-product-category">
                          {product.category}
                        </span>
                        <h3 className="product-name">
                          <Link to={`/shop/${product.category}/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <div className="product-rating-price">
                          <span className="price">
                            <ins>
                              <span className="price-amount amount">
                                {/* <span className="currency-symbol">$</span> */}
                                {product.price} Pkr
                              </span>
                            </ins>
                          </span>
                         
                        </div>
                        <div className="product-details__short-description">
                          <p></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </Col>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.authentication.loggedIn,
    count: state.ui.productReducersUi.count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedProductList: () => {
      dispatch(getSelectedProductList());
    },
    addToCompareItems: () => {
      dispatch(addToCompareItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider);
