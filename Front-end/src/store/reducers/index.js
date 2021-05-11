import { combineReducers } from "redux";
import productListReducer from "./reducers";
import productReducersUi from "./reducersUi";
import products from "./products";
import filters from "./filters";
import authReducer from "./auth/index";
import loginReducers from './login.reducers';

const entitiesReducers = combineReducers({
  productListReducer,
});

const uiReducers = combineReducers({
  productReducersUi,
});

export default combineReducers({
  entities: entitiesReducers,
  auth: authReducer,
  ui: uiReducers,
  data: products,
  filters: filters,
});
