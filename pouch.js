import { Map } from "immutable";
import currencies from "./currencies";

const costOfCoffee = 3;

export const Coffee = {
  type: currencies.COFFEE,
  cost: () => {
    return Map({
      [currencies.MONEY]: costOfCoffee,
      [currencies.COFFEE]: -1
    });
  }
};

export const Pot = {
  type: currencies.COFFEE,
  cost: () => {
    return Map({
      [currencies.POTS]: 1,
      [currencies.MONEY]: -2
    });
  }
};
