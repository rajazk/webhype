import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Col, Container, Row, Table } from "reactstrap";
import Adminsitebar from "../Adminsitebar";
import { addToCompareItems } from "../../store/actions/actions";
import { connect } from "react-redux";

class WhishListItems extends Component {
  constructor(props) {
    super(props);
    this.ReadWishListItems = this.ReadWishListItems.bind(this);
    this.AddToCart = this.AddToCart.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  ReadWishListItems() {
    return JSON.parse(localStorage.getItem("LocalWishListItems"));
  }

  AddToCart(
    ProductID,
    MainBrand,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus,
    addProduct,
    Index
  ) {
    this.props.addToCompareItems();
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart == null) Cart = new Array();
    let selectedProduct = Cart.find(
      (product) => product.ProductName === ProductName
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

        toast.success("Item Added to Compare");
        var UpdatedCart1 = JSON.parse(
          localStorage.getItem("LocalWishListItems")
        );
        UpdatedCart1 = UpdatedCart1.slice(0, Index).concat(
          UpdatedCart1.slice(Index + 1, UpdatedCart1.length)
        );
        localStorage.removeItem("LocalWishListItems");
        localStorage.setItem(
          "LocalWishListItems",
          JSON.stringify(UpdatedCart1)
        );
      } else {
        var UpdatedCart1 = JSON.parse(
          localStorage.getItem("LocalWishListItems")
        );
        UpdatedCart1 = UpdatedCart1.slice(0, Index).concat(
          UpdatedCart1.slice(Index + 1, UpdatedCart1.length)
        );
        localStorage.removeItem("LocalWishListItems");
        localStorage.setItem(
          "LocalWishListItems",
          JSON.stringify(UpdatedCart1)
        );
        toast.success("Item is already in compare but removed from wishlist");
      }
    } else {
      toast.warning("product can not be added more than 4 items");
    }
  }

  removeFromWishList = (Index) => {
    this.props.addToCompareItems();
    var UpdatedCart = JSON.parse(localStorage.getItem("LocalWishListItems"));
    UpdatedCart = UpdatedCart.slice(0, Index).concat(
      UpdatedCart.slice(Index + 1, UpdatedCart.length)
    );
    localStorage.removeItem("LocalWishListItems");
    localStorage.setItem("LocalWishListItems", JSON.stringify(UpdatedCart));
  };

  render() {
    return (
      <div className="site-content">
        <ToastContainer autoClose={2500} />
        <div className="content-wrapper section-ptb">
          <Container>
            <Row>
              <Col lg={12} className="mt-4 mt-lg-0">
                {this.ReadWishListItems() != null &&
                this.ReadWishListItems().length > 0 ? (
                  <div className="table-responsive">
                    <Table className="table wishlist-table cart-table">
                      <thead>
                        <tr>
                          <th clas="product-remove"></th>
                          <th className="product-thumbnail" />
                          <th className="product-name">
                            <span className="nobr">Product Name</span>
                          </th>
                          <th className="product-price">
                            <span className="nobr">Unit Price </span>
                          </th>
                          <th className="product-brand">
                            <span className="nobr">Brands </span>
                          </th>
                         
                          <th className="product-add-to-cart" />
                        </tr>

                        {this.ReadWishListItems().map((CartItem, index) => (
                          <tr>
                            <td className="product-remove">
                              <Link
                                onClick={() => this.removeFromWishList(index)}
                                className="remove"
                              ></Link>
                            </td>
                            <td className="product-thumbnail">
                              <a href="#">
                                <img
                                  src={CartItem.ProductImage}
                                  alt="product"
                                />
                              </a>
                            </td>
                            <td className="product-name">
                              {CartItem.ProductName}
                            </td>
                            <td className="product-price">${CartItem.Rate}</td>
                            <td className="product-price">
                              {CartItem.MainBrand}
                            </td>
                           
                            <td className="product-add-to-cart">
                              <Link
                                onClick={() =>
                                  this.AddToCart(
                                    CartItem.ProductData.id,
                                    CartItem.ProductData.mainBrand,
                                    CartItem.ProductData.name,
                                    CartItem.ProductData.pictures[0],
                                    1,
                                    CartItem.ProductData.salePrice,
                                    "In Stock",
                                    CartItem.ProductData,
                                    index
                                  )
                                }
                                className="add_to_cart_button"
                              >
                                Add To Compare
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </thead>
                    </Table>
                  </div>
                ) : (
                  <div className="wishlist-not-found">
                    <img
                      src={require(`../../assets/images/empty-search.jpg`)}
                      className="img-fluid mb-4"
                    />
                    <h4 className="d-block">WishList empty</h4>
                    <Link to="/shop" className="btn btn-solid">
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCompareItems: () => {
      dispatch(addToCompareItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhishListItems);
