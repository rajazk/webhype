import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { connect } from "react-redux";
import { products } from "../utilities/constants";
import { appData } from "../utilities/data";
import { brandValue } from "../../store/actions/filter";
class TopSellingProduct extends Component {

  AddToCompare = (
    ProductID,
    ProductCategory,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus
  ) => {
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart == null) Cart = new Array();
    let selectedProduct = Cart.find(
      (product) => product.ProductName === ProductName
    );

    if (Cart && Cart.length < 4) {
      if (selectedProduct == null) {
        Cart.push({
          ProductID: ProductID,
          ProductCategory,
          ProductName,
          ProductImage: ProductImage,
          Qty: Qty,
          Rate: Rate,
          StockStatus: StockStatus,
        });
        localStorage.removeItem("LocalCartItems");
        localStorage.setItem("LocalCartItems", JSON.stringify(Cart));

        toast.success("Item Added to Compare");
      } else {
        toast.warning("Item is already in Compare");
      }
    } else {
      toast.warning("product can not be added more than 4 items");
    }
  };

  AddToWishList = (
    ProductID,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus
  ) => {
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
  };
  CheckCardItem(ID) {
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
  CheckWishList(ID) {
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

  rating(productrat) {
    let rat = [];
    let i = 1;
    while (i <= 5) {
      if (i <= productrat) {
        rat.push(<i className="fa fa-star" />);
      } else {
        rat.push(<i className="fa fa-star-o" />);
      }
      i += 1;
    }
    return rat;
  }

  onClickCategoryFilter(category) {
    this.props.brandValue([category]);
  }
  render() {
    const categoryFilterValues = this.props.filters.category;
    return (
      <Row className="products products-loop grid webhype-products-shortcode">
        <ToastContainer autoClose={1000} />

        {appData.map((product, index) =>
          index < 8 ? (
            <Col sm={6} lg={3} key={index}>
              <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
                <div className="product-inner element-hovered">
                  <div className="product-thumbnail bransList">
                    <div className="product-thumbnail-inner">
                      <Link to="/shop">
                        <div
                          className="product-thumbnail-main"
                          onClick={() =>
                            this.onClickCategoryFilter(product.mainBrand)
                          }
                        >
                          <img
                            src={product.pictures[0]}
                            className="img-fluid"
                            alt="shop"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="webhype-product-category">
                      {product.mainBrand}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          ) : (
            <div></div>
          )
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps, { brandValue })(TopSellingProduct);
