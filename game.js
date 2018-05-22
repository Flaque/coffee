import { buyCoffee, brewCoffee } from "./store";
import config from "./config";

const tick = dispatch => {
  dispatch(buyCoffee());
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
