import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ShopingCart = (props) => {
  const { ReadCartItems, ShowCart, removeFromCart, HideCart, count } = props;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <li className="hype-tools-action hype-tools-cart">
      <Link className="cart-link" to={"#"}>
        <span className="cart-icon">
          <i className="fa fa-code-fork" aria-hidden="true"></i>
        </span>
        <span className="cart-count count">
          {ReadCartItems() == null ? 0 : ReadCartItems().length}
        </span>
      </Link>

      {ReadCartItems() != null && ReadCartItems().length > 0 ? (
        <div className="cart-contents" id="DivCartContent">
          <div className="widget webhype widget-shopping-cart">
            <div className="widget-shopping-cart-content">
              <div className="pgs-product-list-widget-container has-scrollbar">
                <ul className="webhype-mini-cart cart-list">
                  {ReadCartItems().map((CartItem, index) => (
                    <li className="hype-mini-cart-item">
                      <Link
                        key={index}
                        onClick={() => removeFromCart(index)}
                        id={`Product_${CartItem.ProductID}`}
                        className="remove remove_from_cart_button"
                      >
                        ×
                      </Link>
                      <div className="media">
                        <Link to="#">
                          <img
                            width={60}
                            height={76}
                            src={CartItem.ProductImage}
                            className="img-fluid"
                            alt=""
                          />
                        </Link>
                        <div className="media-body">
                          <h6>{capitalizeFirstLetter(CartItem.MainBrand)}</h6>
                          <Link to="#" className="product-title">
                            {CartItem.ProductName}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="webhype-mini-cart__buttons buttons">
                <Link to="/compare-products" className="button wc-forward">
                  View Comparison
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-contents" id="DivCartContent">
          <div className="widget webhype widget-shopping-cart">
            <div className="widget-shopping-cart-content">
              <p className="webhype-mini-cart__total total">
                <span className="comparison-icon">
                  <i className="fa fa-code-fork" aria-hidden="true"></i>
                </span>
                <strong>There is nothing to comparison.</strong>
                <span className="woocs_special_price_code">
                  <span className="webhype-Price-amount amount">
                    <span className="webhype-Price-currencySymbol"></span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.ui.productReducersUi.count,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopingCart);
