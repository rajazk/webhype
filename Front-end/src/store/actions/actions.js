import * as Constants from "../constants/constants";
import { products } from "../../components/utilities/constants";
import { appData } from "../../components/utilities/data";
import axios from "axios";
var _ = require("lodash");

export const getProductList = () => {
  return async (dispatch) => {
    dispatch({
      type: Constants.GET_PRODUCT_LIST_REQUEST,
    });

    try {
      const data = await axios.get(
        "https://my-json-server.typicode.com/benirvingplt/products/products"
      );
      dispatch({
        type: Constants.GET_PRODUCT_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: Constants.GET_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    }
  };
};

export const addQuantity = (id, price, index) => {
  return {
    type: Constants.ADD_PRODUCT,
    id,
    price,
    index,
  };
};

export const subtractQuantity = (id, price, index) => {
  return {
    type: Constants.SUBTRACT_PRODUCT,
    id,
    price,
    index,
  };
};

export const removeToCart = (id, price, index) => {
  return {
    type: Constants.REMOVE_PRODUCT,
    id,
    price,
    index,
  };
};

export const receiveProducts = () => {
  return async (dispatch) => {
    let data = await axios.get("http://localhost:5001/api/v1/products/");
    dispatch({
      type: "ACTUAL_PRODUCTS",
      products: data.data.data,
    });
  };
};

export const getBrandProductList = (brandOne, brandTwo, brandThree) => {
  return async (dispatch) => {
    dispatch({
      type: Constants.GET_BRAND_PRODUCT_LIST_REQUEST,
    });
    try {
      const brandOneData = await axios.get(
        `http://localhost:5001/api/v1/products/brands?mainBrand=${brandOne}`
      );
      const brandTwoData = await axios.get(
        `http://localhost:5001/api/v1/products/brands?mainBrand=${brandTwo}`
      );
      const brandThreeData = await axios.get(
        `http://localhost:5001/api/v1/products/brands?mainBrand=${brandThree}`
      );
      Promise.all([
        brandOneData.data.data,
        brandTwoData.data.data,
        brandThreeData.data.data,
      ]).then((data) => {
        dispatch({
          type: Constants.GET_BRAND_PRODUCT_LIST_SUCCESS,
          payload: {
            brandOneData: brandOneData.data.data,
            brandTwoData: brandTwoData.data.data,
            brandThreeData: brandThreeData.data.data,
            products: mergeDedupe(data),
          },
        });
      });
    } catch (err) {
      console.log("error");
      dispatch({
        type: Constants.GET_BRAND_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    }
  };
};

export const getSelectedProductList = () => {
  return async (dispatch) => {
    const selectedProducts = JSON.parse(localStorage.getItem("LocalCartItems"));
    let urls =
      selectedProducts &&
      selectedProducts.map((obj) => {
        return `http://localhost:5001/api/v1/products/brands?mainBrand=${obj.MainBrand}&gender=${obj.ProductData.gender}`;
      });

    if (selectedProducts === null || selectedProducts.length === 0) {
      urls = ["http://localhost:5001/api/v1/products/brands?mainBrand=engine"];
    }

    try {
      fetchData(urls).then((arrayOfResponses) => {
        dispatch({
          type: Constants.GET_SELECTED_BRAND_PRODUCT_LIST_SUCCESS,
          payload: _.shuffle(mergeDedupe(arrayOfResponses)),
        });
      });
    } catch (err) {
      dispatch({
        type: Constants.GET_BRAND_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    }
  };
};

const mergeDedupe = (arr) => {
  return [...new Set([].concat(...arr))];
};

const fetchData = (urls) => {
  const allRequests = urls.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.data)
  );

  return Promise.all(allRequests);
};

export function addToCompareItems() {
  return (dispatch) => {
    dispatch({
      type: Constants.LOCAL_STRAGE_CHANGE,
    });
  };
}
