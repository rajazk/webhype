import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { getFilterProductsdata } from "../../services";
import BrandList from "../../components/widgets/BrandList";
import SideFilter from "../../components/widgets/shopfilter/SideFilter";
import SocialFilter from "../../components/widgets/shopfilter/SocialInfo";
import TopFilter from "../../components/widgets/shopfilter/TopFilter";
import BrandTopFilter from "../../components/widgets/shopfilter/BrandTopFilter";
import axios from "axios";

class CompareBrands extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      limit: 8,
    };
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
    let {
      brand1Products,
      brand2Products,
      brand3Products,
      productFetched,
    } = this.props;

    let layoutstyle = "col-sm-6 col-md-4";
    return (
      <div className="site-content">
        <div className="content-wrapper section-pt mb-3 mb-md-5">
          <Container>
            <Row>
              <div className="sidebar col-xl-3 col-lg-4 desktop">
                <div className="shop-sidebar-widgets">
                  <SideFilter compareBrand={true} />
                </div>
              </div>
              <div className="content col-xl-9 col-lg-8">
                <div className="products-header">
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <BrandTopFilter />
                      </div>
                    </div>
                  </div>
                </div>
                {productFetched ? (
                  <div>
                    <Row className="products products-loop grid webhype-products-shortcode pgs-product-list">
                      <Col xs="4">
                        {brand1Products.length !== 0 ? (
                          brand1Products
                            .slice(0, this.state.limit)
                            .map((product, index) => (
                              <BrandList
                                product={product}
                                key={index}
                                history={this.props.history}
                                layoutstyle={layoutstyle}
                              />
                            ))
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            There is no data in these filters
                          </p>
                        )}
                      </Col>
                      <Col xs="4">
                        {brand2Products.length !== 0 ? (
                          brand2Products
                            .slice(0, this.state.limit)
                            .map((product, index) => (
                              <BrandList
                                product={product}
                                key={index}
                                history={this.props.history}
                                layoutstyle={layoutstyle}
                              />
                            ))
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            There is no data in these filters
                          </p>
                        )}
                      </Col>
                      <Col xs="4">
                        {brand3Products.length !== 0 ? (
                          brand3Products
                            .slice(0, this.state.limit)
                            .map((product, index) => (
                              <BrandList
                                product={product}
                                key={index}
                                history={this.props.history}
                                layoutstyle={layoutstyle}
                              />
                            ))
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            There is no data in these filters
                          </p>
                        )}
                      </Col>
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
                        Sorry! No products were found matching your selection!
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

const mapStateToProps = (state) => {
  console.log("state.filters: ", state.filters);
  return {
    productFetched: state.ui.productReducersUi.productFetched,
    brand1Products: getFilterProductsdata(
      state.data.brand1_products,
      state.filters
    ),
    brand2Products: getFilterProductsdata(
      state.data.brand2_products,
      state.filters
    ),
    brand3Products: getFilterProductsdata(
      state.data.brand3_products,
      state.filters
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompareBrands);
