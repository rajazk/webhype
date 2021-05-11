import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

class AboutBanner extends Component {
  constructor() {
    super();
    this.state = { showText: false };
  }
  getMoreTextDiv() {
    if (this.state.showText) {
      return (
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour.
        </p>
      );
    } else {
      return null;
    }
  }
  render() {
    var expandedDiv = this.getMoreTextDiv();
    return (
      <Row className="section-ptb align-items-center">
        <Col md={6} className="order-md-1 mb-4 mb-md-0">
          <div className="single_image-wrapper">
            <img
              alt=""
              src={require(`../../assets/images/about-us.jpg`)}
              className="attachment-full img-fluid"
              alt=""
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="text-wrapper">
            <span>Know more</span>
          </div>
          <div className="section-title mb-4">
            <h2 className="title text-left"> About WebHype</h2>
            <div className="text-wrapper">
              <p>
                We are webHype ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veni quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              {expandedDiv}
            </div>
          </div>
          <div className="webhype_button_wrapper webhype_button_width_default">
            <div className="inline_hover webhype_button_link webhype_button_size_medium button-underline">
              <Link
                to={"#"}
                style={{ cursor: "pointer" }}
                className="inline_hover"
                onClick={() =>
                  this.setState({ showText: !this.state.showText })
                }
              >
                {this.state.showText ? "Read Less.." : "Read More.."}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AboutBanner;
