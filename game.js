import { buyCoffee } from "./store";

const tick = dispatch => {
  dispatch(buyCoffee());
};

let timer = undefined;

export const start = dispatch => {
  timer = setTimeout(() => {
    tick(dispatch);
    start(dispatch);
  }, 1000);
};

export const stop = dispatch => {
  if (timer) {
    timer.clearTimeout();
  }
};
