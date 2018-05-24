import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Map } from "immutable";
import currencies from "./currencies";
import { createAction } from "redux-actions";
import { Coffee, Pot, Brewer } from "./pouch";
import { buy } from "merchant.js";
import config from "./config";

const { BREW_SPEED } = config;
const INITIAL_CUPS_PER_BREW = 1;

// Utils
const buyIfEnoughMoney = (item, wallet) => {
  const newWallet = buy(item, wallet, wallet);
  if (newWallet.get(currencies.MONEY) >= 0.0) {
    return newWallet;
  }
  return wallet;
};

const updateCupsPerBrew = state => {
  return state.update(
    currencies.CUPS_PER_BREW,
    c => state.get(currencies.POTS) + INITIAL_CUPS_PER_BREW
  );
};

// Actions
export const types = {
  MAKE_COFFEE: "MAKE_COFFEE",
  SELL_COFFEE: "SELL_COFFEE",
  BREW_COFFEE: "BREW_COFFEE",
  START_BREW: "START_BREW",
  EMPTY_POT: "EMPTY_POT",
  BUY_POT: "BUY_POT",
  BUY_BREWER: "BUY_BREWER"
};

export const sellCoffee = createAction(types.SELL_COFFEE);
export const startBrew = createAction(types.START_BREW);
export const buyPot = createAction(types.BUY_POT);
export const buyBrewer = createAction(types.BUY_BREWER);

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
  [currencies.POTS]: 0,
  [currencies.BREWERS]: 0,
  [currencies.CUPS_PER_BREW]: INITIAL_CUPS_PER_BREW,
  [currencies.COST_OF_COFFEE]: 3
});

export const reducer = (wallet = defaultState, action) => {
  switch (action.type) {
    case types.MAKE_COFFEE:
      return updateCupsPerBrew(wallet).update(
        currencies.COFFEE,
        c => c + wallet.get(currencies.CUPS_PER_BREW)
      );
    case types.SELL_COFFEE:
      if (wallet.get(currencies.COFFEE) <= 0) {
        return wallet;
      }
      return buy(Coffee, wallet, wallet);
    case types.BUY_POT:
      return updateCupsPerBrew(buyIfEnoughMoney(Pot, wallet));
    case types.START_BREW:
      return updateCupsPerBrew(wallet).update(
        currencies.BREW_PROGRESS,
        c => c + BREW_SPEED
      );
    case types.EMPTY_POT:
      return wallet.set(currencies.BREW_PROGRESS, 0);
    case types.BREW_COFFEE:
      if (wallet.get(currencies.BREW_PROGRESS) <= 0.0) {
        return wallet;
      }
      return wallet.update(currencies.BREW_PROGRESS, c => c + BREW_SPEED);
    case types.BUY_BREWER:
      return buyIfEnoughMoney(Brewer, wallet);
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
