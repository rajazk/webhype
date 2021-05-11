import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCompareItems } from "../../store/actions/actions";
import { connect } from "react-redux";

class BrandList extends Component {
  AddToCompare = (
    ProductID,
    MainBrand,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus,
    addProduct
  ) => {
    this.props.addToCompareItems();
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
  };

  AddToWishList = (
    ProductID,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus
  ) => {
    this.props.addToCompareItems();
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

  handleToast = () => {
    toast.warning("Please login to add item in wishlist");
  };

  render() {
    const { product, key } = this.props;
    let rat = [];
    let rating = product.rating;
    let i = 1;
    while (i <= 5) {
      if (i <= rating) {
        rat.push(<i className="fa fa-star" />);
      } else {
        rat.push(<i className="fa fa-star-o" />);
      }
      i += 1;
    }

    return (
      <div key={key}>
        <ToastContainer autoClose={1000} draggable={false} />
        <div className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
          <div className="product-inner element-hovered">
            <div className="product-thumbnail">
              <div className="product-thumbnail-inner">
                <Link to={`/shop/${product.category}/${product.id}`}>
                  {product.pictures[0] ? (
                    <div className="product-thumbnail-main">
                      <img src={product.pictures[0]} className="img-fluid" />
                    </div>
                  ) : null}
                  {product.pictures[1] ? (
                    <div className="product-thumbnail-swap">
                      <img src={product.pictures[1]} className="img-fluid" />
                    </div>
                  ) : null}
                </Link>
              </div>

              <div className="product-actions">
                <div className="product-actions-inner">
                  <div className="product-action product-action-add-to-cart">
                    {!this.CheckCardItem(product.id) ? (
                      <Link
                        to="#"
                        onClick={() =>
                          this.AddToCompare(
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
                        to="/compare-products"
                        className="button add_to_cart_button"
                        rel="nofollow"
                      >
                        View compare
                      </Link>
                    )}
                  </div>
                  <div className="product-action product-action-wishlist">
                    {!this.CheckWishList(product.id) ? (
                      <Link
                        to="#"
                        onClick={() => {
                          this.props.loggedIn
                            ? this.AddToWishList(
                                product.id,
                                product.name,
                                product.pictures[0],
                                1,
                                product.salePrice,
                                "In Stock"
                              )
                            : this.handleToast();
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
                        to="#"
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
              {product.tags ? (
                <span className="webhype-product-category">
                  {product.tags.map((tag, index) => (
                    <span key={index}>
                      {tag}
                      {index === product.tags.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </span>
              ) : null}
              {product.gender ? (
                <span className="webhype-product-category">
                  {product.gender}
                </span>
              ) : null}
              {product.name ? (
                <h3 className="product-name">
                  <Link to={`/shop/${product.category}/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
              ) : null}
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
              <div className="product-actions product-actions-list">
                <div className="product-actions-inner">
                  <div className="product-action product-action-add-to-cart">
                    {!this.CheckCardItem(product.id) ? (
                      <Link
                        to="#"
                        onClick={() =>
                          this.AddToCompare(
                            product.id,
                            product.name,
                            product.pictures[0],
                            1,
                            product.salePrice,
                            "In Stock"
                          )
                        }
                        className="button add_to_cart_button"
                        rel="nofollow"
                      >
                        Add to compare
                      </Link>
                    ) : (
                      <Link
                        to="/compare-products"
                        className="button add_to_cart_button"
                        rel="nofollow"
                      >
                        View Cart
                      </Link>
                    )}
                  </div>
                  <div className="product-action product-action-wishlist">
                    {!this.CheckWishList(product.id) ? (
                      <Link
                        to="#"
                        onClick={() => {
                          this.props.loggedIn
                            ? this.AddToWishList(
                                product.id,
                                product.name,
                                product.pictures[0],
                                1,
                                product.salePrice,
                                "In Stock"
                              )
                            : this.handleToast();
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
                        to="#"
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.ui.productReducersUi.count,
  loggedIn: state.auth.authentication.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCompareItems: () => {
      dispatch(addToCompareItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandList);
