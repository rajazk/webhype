const inititalState = {
  products: [],
  detail_products: [],
  brand1_products: [],
  brand2_products: [],
  brand3_products: [],
  firstBrand: "",
  secondBrand: "",
  thirdBrand: "",
  recommendedProduct: [],
  selectedBrandsProduct: []
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case "ACTUAL_PRODUCTS":
      return Object.assign({}, state, {
        products: action.products,
      });
    case "GET_BRAND_PRODUCT_LIST_SUCCESS":
      return Object.assign({}, state, {
        brand1_products: action.payload.brandOneData,
        brand2_products: action.payload.brandTwoData,
        brand3_products: action.payload.brandThreeData,
        selectedBrandsProduct: action.payload.products
      });
    case "SELECTED_BRANDS_LIST":
      return Object.assign({}, state, {
        firstBrand: action.payload.brandOne,
        secondBrand: action.payload.brandTwo,
        thirdBrand: action.payload.brandThree,
      });

    case "GET_SELECTED_BRAND_PRODUCT_LIST_SUCCESS":
      return Object.assign({}, state, {
        recommendedProduct: action.payload,
      });
    default:
      return state;
  }
};
