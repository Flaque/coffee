import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import currencies from "../currencies";
import { serialize, deserialize } from "json-immutable";
import { makeCoffee } from "../store";
import { start } from "../game";
import Head from "../lib/head.js";

const createCurrency = label => ({ count }) => (
  <p>
    <span>{label} </span> {"~"} {count.toFixed(1)}
    <style jsx>{`
      span {
        color: #0097e6;
      }
    `}</style>
  </p>
);

const Coffee = createCurrency("☕️ Coffee");
const Money = createCurrency("💵 Money");

class Main extends React.Component {
  componentDidMount() {
    start(this.props.dispatch);
  }

  render() {
    const { coffee, money, handleMakeCoffee } = this.props;

    return (
      <main>
        <Head />
        <p>
          <button onClick={handleMakeCoffee}>
            {"☕️"} Make Coffee {"☕️"}
          </button>
        </p>
        <Coffee count={coffee} />
        <Money count={money} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE),
    money: state.get(currencies.MONEY)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMakeCoffee: () => {
      dispatch(makeCoffee());
    },
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
