import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Map } from "immutable";
import currencies from "./currencies";
import { createAction } from "redux-actions";
import { Coffee, Pot } from "./pouch";
import { buy } from "merchant.js";
import config from "./config";

const { BREW_SPEED } = config;

// Actions
export const types = {
  MAKE_COFFEE: "MAKE_COFFEE",
  BUY_COFFEE: "BUY_COFFEE",
  BREW_COFFEE: "BREW_COFFEE",
  START_BREW: "START_BREW",
  EMPTY_POT: "EMPTY_POT",
  BUY_POT: "BUY_POT"
};

export const buyCoffee = createAction(types.BUY_COFFEE);
export const startBrew = createAction(types.START_BREW);
export const buyPot = createAction(types.BUY_POT);

const pourCup = createAction(types.MAKE_COFFEE);
const emptyPot = createAction(types.EMPTY_POT);
const brewCoffeeTick = createAction(types.BREW_COFFEE);

export const brewCoffee = () => (dispatch, getState) => {
  if (getState().get(currencies.BREW_PROGRESS) >= 1.0) {
    dispatch(pourCup());
    dispatch(emptyPot());
  }

  dispatch(brewCoffeeTick());
};

// Reducer
const defaultState = new Map({
  [currencies.COFFEE]: 0,
  [currencies.MONEY]: 0,
  [currencies.BREW_PROGRESS]: 0,
  [currencies.POTS]: 1
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
    case types.BUY_POT:
      return buy(Pot, wallet);
    case types.START_BREW:
      return wallet.update(currencies.BREW_PROGRESS, c => c + BREW_SPEED);
    case types.EMPTY_POT:
      return wallet.set(currencies.BREW_PROGRESS, 0);
    case types.BREW_COFFEE:
      if (wallet.get(currencies.BREW_PROGRESS) <= 0.0) {
        return wallet;
      }
      return wallet.update(currencies.BREW_PROGRESS, c => c + BREW_SPEED);
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
