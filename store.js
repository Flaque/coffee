import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Map } from "immutable";
import { currencies } from "./merchant";
import { createAction } from "redux-actions";

// Actions
export const types = {
  MAKE_COFFEE: "MAKE_COFFEE"
};

export const makeCoffee = createAction(types.MAKE_COFFEE);

// Reducer
const defaultState = new Map({ [currencies.COFFEE]: 0, [currencies.MONEY]: 0 });

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.MAKE_COFFEE:
      return state.update(currencies.COFFEE, c => c + 1);
    default:
      return state;
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
