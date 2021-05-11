import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row, Button  } from "reactstrap";
class CompareProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProducts: null,
      open: false,
      stock: "InStock",
      quantity: 1,
      image: "",
    };
  }

  componentDidMount() {
    var cartData = JSON.parse(localStorage.getItem("LocalCartItems"));
    this.setState({ selectedProducts: cartData });
  }

  removeFromCart = (Index) => {
    var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));
    UpdatedCart = UpdatedCart.slice(0, Index).concat(
      UpdatedCart.slice(Index + 1, UpdatedCart.length)
    );
    localStorage.removeItem("LocalCartItems");
    localStorage.setItem("LocalCartItems", JSON.stringify(UpdatedCart));
    this.setState({ selectedProducts: UpdatedCart });
  };

  render() {
    const { selectedProducts } = this.state;
    if (selectedProducts === null || selectedProducts === undefined || selectedProducts.length === 0) {
      return (
        <h1 style={{ textAlign: "center", padding: '100px 0px'}}>There is nothing to compare</h1>
      );
    }

    return (
      <Container>
        <Row className="products products-loop grid webhype-products-shortcode pgs-product-list">
          {selectedProducts.length > 0 &&
            selectedProducts.map((productData, index) => {
              const data = productData.ProductData;
              return (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
                    <div className="product-inner element-hovered">
                      <div className="product-thumbnail">
                        <div className="product-thumbnail-inner">
                          <div className="product-thumbnail-main">
                            <img
                              src={data.pictures[0]}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        {/* {data.name ? (
                          <h3 className="product-name">{data.name}</h3>
                        ) : null} */}
                        <p>{data.name}</p>
                        <p>
                          <strong>price:</strong> ${data.price}
                        </p>
                        <p>
                          <strong>Discount:</strong> ${data.discount}
                        </p>
                        <p>
                          <strong>Sale Price:</strong>${data.salePrice}
                        </p>
                        <p>
                          <strong>Stock:</strong> ${data.stock}
                        </p>
                        <p>
                          <strong>Sizes: </strong>
                          {data.size.map((size) => {
                            return size + ", ";
                          })}
                        </p>
                        <p>
                          <strong>Color: </strong>
                          {data.colors.map((color) => {
                            return color + ", ";
                          })}
                        </p>
                        <Button
                          color="primary"
                          onClick={() => this.removeFromCart(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Row>
      </Container>
    );
  }
}

export default CompareProducts;
