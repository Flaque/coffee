import { Map } from "immutable";
import currencies from "./currencies";

const costOfCoffee = 0.25;

export const Coffee = {
  type: currencies.COFFEE,
  cost: () => {
    return Map({
      [currencies.MONEY]: 0.25,
      [currencies.COFFEE]: -costOfCoffee
    });
  }
};
