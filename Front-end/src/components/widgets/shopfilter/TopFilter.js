import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Form, Row } from "reactstrap";
import {
  ratingValue,
  sortValue,
  searchValue,
} from "../../../store/actions/filter";
import { products } from "../../utilities/constants";
import { getFilterProductsdata } from "../../../services";

class TopFilter extends Component {
  state = {
    SearchValue: "",
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      SearchValue: "",
    });
    this.props.searchValue("");
    this.nameInput.focus();
  }

  SearchTextchange(SearchText) {
    this.setState({
      ...this.state,
      SearchValue: SearchText.target.value,
    });
    this.props.searchValue(SearchText.target.value);
  }
  render() {
    const productlength = this.props.productlength;

    return (
      <Row>
        <Col md="3">
          {productlength > 0 ? (
            <p className="result-count">
              Showing 1–{productlength} results of {products.length}
            </p>
          ) : (
            <p className="result-count">
              Showing 0 results of {products.length}
            </p>
          )}
        </Col>
        <Col md="6">
          <input
            type="text"
            id="btn-search"
            ref={(input) => {
              this.nameInput = input;
            }}
            className="form-control"
            value={this.state.SearchValue}
            onChange={this.SearchTextchange.bind(this)}
            placeholder="Search a Product"
          />
        </Col>

        <Col md="3">
          <Form className="ordering">
            <select
              name="orderby"
              className="orderby select2"
              onChange={(e) => this.props.sortValue(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value=" " selected="selected">
                Default sorting
              </option>
              <option value="NewProduct">Newest Items</option>
              <option value="Pricehigh">Price: High to Low</option>
              <option value="Pricelow">Price: Low to High</option>
            </select>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (state) => ({
  products: getFilterProductsdata(state.data.products, state.filters),
  filters: state.filters,
});

export default connect(mapDispatchToProps, {
  sortValue,
  ratingValue,
  searchValue,
})(TopFilter);
