import { sellCoffee, brewCoffee } from "./store";
import config from "./config";

const tick = dispatch => {
  dispatch(sellCoffee());
  dispatch(brewCoffee());
};

let timer = undefined;

export const start = dispatch => {
  timer = setTimeout(() => {
    tick(dispatch);
    start(dispatch);
  }, config.TICK_SPEED);
};

export const stop = dispatch => {
  if (timer) {
    timer.clearTimeout();
  }
};
