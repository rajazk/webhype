import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <Col xl={2} lg={2} className="col-6">
      <div className="logo-wrapper">
        <Link to="/">
          <img className="img-fluid" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="clearfix" />
    </Col>
  );
};

export default Logo;
