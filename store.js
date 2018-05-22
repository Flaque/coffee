import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Map } from "immutable";
import { currencies } from "./merchant";

const defaultState = new Map({ [currencies.COFFEE]: 0, [currencies.MONEY]: 0 });

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export function initStore(state = defaultState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
