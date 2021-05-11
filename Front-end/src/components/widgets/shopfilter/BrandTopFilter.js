import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Form, Row, Button } from "reactstrap";
import { getBrandProductList } from "../../../store/actions/actions";
import { products } from "../../utilities/constants";
import { getFilterProductsdata, uniqueBrand } from "../../../services";

class TopFilter extends Component {
  state = {
    brandOne: "",
    brandTwo: "",
    brandThree: "",
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCompare = () => {
    const { brandOne, brandTwo, brandThree } = this.state;
    this.props.getBrandProductList(brandOne, brandTwo, brandThree);
    if (this.props.section === "home") {
      this.props.history.push("/compare-brands");
    }
  };

  render() {
    return (
      <Row>
        <Col md="3">
          <Form className="ordering">
            <select
              className="orderby select2"
              name="brandOne"
              onChange={(e) => this.onChangeHandler(e)}
              tabIndex={-1}
              value={this.state.brandOne}
              aria-hidden="true"
            >
              <option value="" selected="selected">
                Select Brand First
              </option>
              {this.props.brands.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
            </select>
          </Form>
        </Col>
        <Col md="3">
          <Form className="ordering">
            <select
              className="orderby select2"
              name="brandTwo"
              onChange={(e) => this.onChangeHandler(e)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value="" selected="selected">
                Select Brand Second
              </option>
              {this.props.brands.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
            </select>
          </Form>
        </Col>

        <Col md="3">
          <Form className="ordering">
            <select
              className="orderby select2"
              name="brandThree"
              onChange={(e) => this.onChangeHandler(e)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value="" selected="selected">
                Select Brand Three
              </option>
              {this.props.brands.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
            </select>
          </Form>
        </Col>
        <Col md="3">
          <Button color="primary" onClick={this.handleCompare}>
            Compare Brand
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getFilterProductsdata(state.data.products, state.filters),
  brands: uniqueBrand(state.data.products),
  filters: state.filters,
});


export default connect(mapStateToProps, {getBrandProductList})(TopFilter);
