import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.css";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
