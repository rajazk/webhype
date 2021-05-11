import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.Checkscroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.Checkscroll);
  }

  Checkscroll() {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollTop > 350) {
      if (document.getElementById("back-to-top") != null) {
        document
          .getElementById("back-to-top")
          .setAttribute("style", "display:block");
      }
    } else {
      if (document.getElementById("back-to-top") != null) {
        document
          .getElementById("back-to-top")
          .setAttribute("style", "display:none");
      }
    }
  }
  ClicktoTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
  render() {
    let backtotop = { display: "none" };
    return (
      <div>
        <footer className="site-footer">
          <div className="footer-wrapper">
            <div className="footer-widgets-wrapper">
              <div className="footer">
                <Container>
                  <Row>
                    <div className="col-lg-6 col-md-5 footer-align-left">
                      <div className="logo-wrapper widget">
                        <p>
                          <Link to="#">
                            <img
                              className="img-fluid"
                              src={require(`../../assets/images/PNGArtboard4.png`)}
                              alt="logo"
                            />
                          </Link>
                        </p>
                      </div>
                      <div className="text-content">
                        <p className="mb-3 mt-4">
                          Webhype is a name which is synonymous with fashions & trends in Pakistan. Established in 2020, this is a company birthed out of an ambitious investment in the fashion industry by the visionary team. Pioneers of providing the latest fashion apparel to the Pakistani consumers, Webhype has been at the forefront of introducing the latest and trendiest clothes for the masses. 
                        </p>
                        
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-1 footer-align-left"></div>
                    <div className="col-lg-4 col-md-5 footer-align-left">
                      <div className="pgs-contact-widget widget mt-4 mt-lg-0">
                        <h4 className="footer-title title">Contact Info</h4>
                        <div className="footer-address">
                          <ul>
                            <li>
                              <i className="fa fa-map-marker" />
                              <span>
                                Park Rd, Islamabad, Islamabad Capital Territory
                                45550
                              </span>
                            </li>
                            <li className="pgs-contact-email">
                              <i className="fa fa-envelope-o" />
                              <span>webHype@gmail.com</span>
                            </li>
                            <li>
                              <i className="fa fa-phone" />
                              <span>123-456-2345</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            </div>

            <div className="site-info">
              <div className="footer-widget">
                <Container>
                  <div className="row align-items-center">
                    <Col md={6} className="float-left">
                      <p>
                        © Copyright 2019 <Link to="#">webHype</Link> All Rights
                        Reserved.
                      </p>
                    </Col>
                    <Col md={6} className="float-right">
                      <div className="payments text-right"></div>
                    </Col>
                  </div>
                  <div className="clearfix" />
                </Container>
              </div>
            </div>
          </div>
        </footer>
        {/* Back to Top */}
        <div id="back-to-top" style={backtotop} onClick={this.ClicktoTop}>
          <Link className="top arrow" to="#">
            <i className="fa fa-angle-up"></i>
          </Link>
        </div>
      </div>
    );
  }
}
export default Footer;
