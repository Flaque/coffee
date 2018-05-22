import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import { fromJS } from "immutable";

export default withRedux(initStore, {
  serializeState: state => {
    // state here is always an immutable Map
    console.log("/// serializeState", state);
    return state.toJS();
  },
  deserializeState: state => {
    // state here is always undefined. See in the terminal log
    console.log("/// deserializeState", state);
    return state ? fromJS(state) : state;
  }
})(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  }
);
