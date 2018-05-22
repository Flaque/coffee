import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Map } from "immutable";
import currencies from "./currencies";
import { createAction } from "redux-actions";
import { Coffee } from "./pouch";
import { buy } from "merchant.js";

// Actions
export const types = {
  MAKE_COFFEE: "MAKE_COFFEE",
  BUY_COFFEE: "BUY_COFFEE"
};

export const makeCoffee = createAction(types.MAKE_COFFEE);
export const buyCoffee = createAction(types.BUY_COFFEE);

// Reducer
const defaultState = new Map({
  [currencies.COFFEE]: 0,
  [currencies.MONEY]: 0
});

export const reducer = (wallet = defaultState, action) => {
  switch (action.type) {
    case types.MAKE_COFFEE:
      return wallet.update(currencies.COFFEE, c => c + 1);
    case types.BUY_COFFEE:
      if (wallet.get(currencies.COFFEE) <= 0) {
        return wallet;
      }
      return buy(Coffee, wallet);
    default:
      return wallet;
  }
};

// Store
export function initStore(state = defaultState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
