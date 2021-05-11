import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { appData } from "../../components/utilities/data";
import { getFilterProductsdata } from "../../services";
import ProductList from "../../components/widgets/ProductList";
import SideFilter from "../../components/widgets/shopfilter/SideFilter";
import SocialFilter from "../../components/widgets/shopfilter/SocialInfo";
import TopFilter from "../../components/widgets/shopfilter/TopFilter";
import axios from "axios";

class Shop extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      limit: 8,
      hasMoreProduct: true,
      getproduct: appData,
    };
  }

  componentWillMount() {
    if (this.state.limit < this.state.getproduct.length) {
      setTimeout(() => {
        this.setState({
          limit: this.state.limit + 8,
        });
      }, 2500);
    }
  }

  onLoadMore = () => {
    this.setState({
      limit: this.state.limit + 8,
    });
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    let { products } = this.props;
    let layoutstyle = localStorage.getItem("setLayoutStyle");

    if (layoutstyle == null) {
      layoutstyle = localStorage.setItem("setLayoutStyle", "col-sm-6 col-md-4");
    }

    return (
      <div className="site-content">
        <div className="content-wrapper section-pt mb-3 mb-md-5">
          <Container>
            <Row>
              <div className="sidebar col-xl-3 col-lg-4 desktop">
                <div className="shop-sidebar-widgets">
                  <SideFilter />
                </div>
              </div>
              <div className="content col-xl-9 col-lg-8">
                <div className="products-header">
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <TopFilter productlength={products.length} />
                      </div>
                    </div>
                  </div>
                </div>

                {products.length > 0 ? (
                  <div>
                    <Row className="products products-loop grid webhype-products-shortcode pgs-product-list">
                      {products
                        .slice(0, this.state.limit)
                        .map((product, index) => (
                          <ProductList
                            history={this.props.history}
                            product={product}
                            key={index}
                            layoutstyle={layoutstyle}
                          />
                        ))}
                    </Row>
                    <div className="text-center">
                      <a onClick={this.onLoadMore} className="loadmore-btn">
                        Load More
                      </a>
                    </div>
                  </div>
                ) : (
                  <Row className="products products-loop grid webhype-products-shortcode">
                    <div className="col-sm-12 text-center  mt-5">
                      <img
                        src={require(`../../assets/images/empty-search.jpg`)}
                        className="img-fluid mb-4"
                      />
                      <h3>
                        Sorry! No products were found matching your selection!{" "}
                      </h3>
                      <p>Please try to other words.</p>
                      <button
                        onClick={this.refreshPage}
                        className="btn btn-solid"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </Row>
                )}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  products: getFilterProductsdata(state.data.products, state.filters),
});

export default connect(mapDispatchToProps, {})(Shop);
