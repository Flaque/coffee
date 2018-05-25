import { Map } from "immutable";
import currencies from "./currencies";
import config from "./config";

const costOfCoffee = 3;

const inflatePrice = x => {
  if (x === 0) {
    return 0;
  }
  return Math.ceil(1.8 * x + 6 * Math.log(x));
};

const Coffee = {
  type: currencies.COFFEE,
  cost: state => {
    return Map({
      [currencies.MONEY]: state.get(currencies.COST_OF_COFFEE),
      [currencies.COFFEE]: -1
    });
  }
};

const Pot = {
  type: currencies.COFFEE,
  cost: state => {
    return Map({
      [currencies.POTS]: 1,
      [currencies.MONEY]: -(
        config.START_POT_PRICE + inflatePrice(state.get(currencies.POTS))
      )
    });
  }
};

const Brewer = {
  type: currencies.BREWERS,
  cost: state => {
    return Map({
      [currencies.MONEY]: -10,
      [currencies.BREWERS]: 1
    });
  },
  effect: state => {
    return Map({
      [currencies.COFFEE]: 0.1
    });
  }
};

export default {
  Coffee,
  Pot,
  Brewer
};
