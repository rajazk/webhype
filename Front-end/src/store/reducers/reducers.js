import * as Constants from "../constants/constants";

const inititalState = {
  productList: [],
  total: 0,
  addedProduct: [] //{productId:1, quantity: 0}
};

export default function productListReducer(state = inititalState, action) {
  let newObj = [...state.productList];
  switch (action.type) {
    case Constants.GET_PRODUCT_LIST_SUCCESS:
      return Object.assign({}, state, {
        productList: action.payload
      });

    case Constants.ADD_PRODUCT:
      let product = state.addedProduct.find(
        product => product.productId === action.id
      );

      if (product) {
        product.quantity += 1;
        newObj[action.index].quantity += 1;
        return Object.assign({}, state, {
          total: state.total + action.price,
          productList: [...newObj]
        });
      } else {
        newObj[action.index].quantity = 1;
        return Object.assign({}, state, {
          total: state.total + action.price,
          addedProduct: [
            ...state.addedProduct,
            { productId: action.id, quantity: 1 }
          ],
          productList: [...newObj]
        });
      }

    case Constants.SUBTRACT_PRODUCT:
      let findProduct = state.addedProduct.find(
        product => product.productId === action.id
      );
      if (findProduct === undefined || findProduct.quantity === undefined || findProduct.quantity === 0) {
        return state;
      }
      newObj[action.index].quantity -= 1;
      findProduct.quantity -= 1;
      let total = state.total - action.price;
      return Object.assign({}, state, {
        productList: [...newObj],
        total: total
      });

    case Constants.REMOVE_PRODUCT:
      let productToRemove = state.addedProduct.find(
        product => product.productId === action.id
      );
      if (
        productToRemove === undefined ||
        productToRemove.quantity === undefined
      ) {
        return state;
      }
      let remaingProducts = state.addedProduct.filter(
        product => product.productId !== action.id
      );
      newObj[action.index].quantity = 0;
      return Object.assign({}, state, {
        total: state.total - (action.price * productToRemove.quantity),
        addedProduct: remaingProducts,
        productList: [...newObj]
      });

    default:
      return state;
  }
}
