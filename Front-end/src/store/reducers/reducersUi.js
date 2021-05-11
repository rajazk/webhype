import * as Constants from "../constants/constants";
import { toast, ToastContainer } from "react-toastify";

const inititalState = {
  productMessage: "",
  productFetching: false,
  productFetched: false,
  productError: false,
  count: 0,
  carts: null,
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case Constants.GET_BRAND_PRODUCT_LIST_REQUEST:
      return Object.assign({}, state, {
        productFetched: false,
        productFetching: true,
        productError: null,
      });
    case Constants.GET_BRAND_PRODUCT_LIST_SUCCESS:
      return Object.assign({}, state, {
        productFetched: true,
        productFetching: false,
        productMessage: "device reading status changed successfully",
      });
    case Constants.GET_BRAND_PRODUCT_LIST_FAILURE:
      return Object.assign({}, state, {
        productMessage: "loading device failed",
        productFetching: false,
        productError: action.payload,
      });
    case Constants.LOCAL_STRAGE_CHANGE: {
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    }
    default:
      return state;
  }
};
