import { Map } from "immutable";
import currencies from "./currencies";

export const Coffee = {
  type: currencies.COFFEE,
  cost: () => {
    return Map({ [currencies.MONEY]: 1 });
  }
};
