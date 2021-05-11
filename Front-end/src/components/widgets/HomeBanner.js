import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class HomeBanner extends Component {
  render() {
    return (
      <Row className="row section-pb">
        <Col md={6} className="mb-2 mb-sm-0">
          <div className="webhype_banner_wrapper mb-4 pb-2">
            <div className="webhype_banner webhype_banner-style-style-1 webhype_banner-effect-none">
              <img
                className="webhype_banner-image img-fluid inline"
                alt="Banner"
                src={require(`../../assets/images/categories/default/adv-banner-img1.png`)}
              />
              <div className="webhype_banner-content webhype_banner-content-1">
                <div className="webhype_banner-content-wrapper">
                  <div className="webhype_banner-content-inner-wrapper">
                    <div className="webhype_banner-label-wrap gscore_banner-text-wrap-1 webhype_banner-text-bg_color hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-label"> New</div>
                    </div>
                    <div className="webhype_banner-text-wrap webhype_banner-text-wrap-2 hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-text">
                        <h2> Checked Blouse With Ruffle Trims</h2>
                      </div>
                    </div>
                    <div className="webhype_banner-btn-wrap webhype_banner-btn-style-link webhype_banner-btn-shape-square">
                      <Link
                        to="/shop"
                        className="webhype_banner-btn inline_hover"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="webhype_banner_wrapper">
            <div className="webhype_banner webhype_banner-style-style-1 webhype_banner-effect-none">
              <img
                className="webhype_banner-image img-fluid inline img-fluid"
                alt="Banner"
                src={require(`../../assets/images/categories/default/adv-banner-img3.png`)}
              />
              <div className="webhype_banner-content webhype_banner-content-2">
                <div className="webhype_banner-content-wrapper">
                  <div className="webhype_banner-content-inner-wrapper">
                    <div className="webhype_banner-label-wrap webhype_banner-text-wrap-1 webhype_banner-text-bg_color hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-label webhype_banner-lanel-yellow">
                        Sale
                      </div>
                    </div>
                    <div className="webhype_banner-text-wrap webhype_banner-text-wrap-2 hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-text">
                        <h2> trousers with contrasting topstitching</h2>
                      </div>
                    </div>
                    <div className="webhype_banner-btn-wrap webhype_banner-btn-style-link webhype_banner-btn-shape-square justify-content-end">
                      <Link
                        to="/shop"
                        className="webhype_banner-btn inline_hover"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} className="mt-4 mt-md-0">
          <div
            className="webhype_banner_wrapper"
            style={{
              backgroundImage: "url(categories/default/adv-banner-img2.png)",
            }}
          >
            <div className="webhype_banner webhype_banner-3 webhype_banner-style-style-1 webhype_banner-effect-none">
              <img
                className="webhype_banner-image img-fluid inline"
                alt="Banner"
                src={require(`../../assets/images/categories/default/adv-banner-img2.png`)}
              />
              <div className="webhype_banner-content position-md-r webhype_banner-content-hleft webhype_banner-content-vtop">
                <div className="webhype_banner-content-wrapper">
                  <div className="webhype_banner-content-inner-wrapper">
                    <div className="webhype_banner-text-wrap webhype_banner-text-wrap-1 hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-text">
                        <h2 className="mt-sm-0">Tops</h2>
                      </div>
                    </div>
                    <div className="webhype_banner-text-wrap webhype_banner-text-wrap-2 hidden-lg hidden-md hidden-sm hidden-xs">
                      <div className="webhype_banner-text">
                        <h3>Season festival</h3>
                      </div>
                    </div>
                    <div className="webhype_banner-btn-wrap webhype_banner-btn-style-flat webhype_banner-btn-size-md webhype_banner-btn-shape-square">
                      <Link to="/shop" className="webhype_banner-btn">
                        Buy now!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default HomeBanner;
