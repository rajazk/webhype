import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import AboutBanner from "../../components/widgets/AboutBanner.js";
import DealOfTheWeek from "../../components/widgets/DealOfTheWeek.js";
import EndOfSeason from "../../components/widgets/EndOfSeason.js";
import HomeBanner from "../../components/widgets/HomeBanner.js";
import HomeSlider from "../../components/widgets/HomSlider.js";
import Subscribe from "../../components/widgets/Subscribe.js";
import TopSellingProduct from "../../components/widgets/TopSellingProduct.js";
import ProductSlider from "../../components/widgets/ProductSlider";
import { connect } from "react-redux";
import BrandTopFilter from "../../components/widgets/shopfilter/BrandTopFilter";

const relatedslider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

class HomePage extends Component {
  state = {};

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <div id="content" className="site-content" tabIndex={-1}>
          <div className="content-wrapper content-wrapper-vc-enabled">
            <div id="primary" className="content-area">
              <main id="main" className="site-main">
                <article
                  id="post-13069"
                  className="post-13069 page type-page status-publish hentry"
                >
                  <div className="entry-content">
                    <Container>
                      <EndOfSeason />
                    </Container>

                    <Container>
                      <div
                        className="products-header"
                        style={{ maxWidth: "800px", margin: "auto" }}
                      >
                        <div className="loop-header">
                          <div className="loop-header-tools">
                            <div className="loop-header-tools-wrapper">
                              <div className="section-title">
                                <h2 className="title">
                                  Compare your favorite brands
                                </h2>
                                <p className="text-center">
                                  Now all your favorite brands at one place
                                </p>
                              </div>
                              <BrandTopFilter
                                section="home"
                                history={this.props.history}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Container>
                    <Container>
                      <Row className="mb-0 mb-sm-3 mb-lg-5">
                        <Col sm={12}>
                          <Row mb={3} className="justify-content-center">
                            <Col sm={10} lg={6} className="text-center">
                              <div className="section-title">
                                <h2 className="title"> Top Selling Brands</h2>
                                <p>
                                  Forget about struggling to do everything at
                                  once: taking care of the family, Running your
                                  business etc.
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <TopSellingProduct />
                        </Col>
                      </Row>
                    </Container>
                    <div className="container section-3">
                      <AboutBanner />
                    </div>
                    <Subscribe />
                    <Container>
                      <div
                        className="related products"
                        style={{ margin: "40px 0" }}
                      >
                        <h2>Recommended Products</h2>
                        <div className="row">
                          <ProductSlider
                            recommendedProduct={this.props.recommendedProduct}
                            settings={relatedslider}
                            history={this.props.history}
                          />
                        </div>
                      </div>
                    </Container>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  recommendedProduct: state.data.recommendedProduct,
});

export default connect(mapDispatchToProps, {})(HomePage);
