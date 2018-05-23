import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import currencies from "../currencies";
import { serialize, deserialize } from "json-immutable";
import { brewCoffee, startBrew } from "../store";
import { start } from "../game";
import Head from "../lib/head.js";
import BrewBar from "../lib/BrewBar";

const createCurrency = label => ({ count }) => {
  if (count <= 0) {
    return null;
  }

  return (
    <p>
      <span>{label} </span> {"~"} {count.toFixed(1)}
      <style jsx>{`
        span {
          color: #0097e6;
        }
      `}</style>
    </p>
  );
};

const Coffee = createCurrency("☕️ Coffee");
const Money = createCurrency("💵 Money");

class Main extends React.Component {
  componentDidMount() {
    start(this.props.dispatch);
  }

  render() {
    const { coffee, money, progress, handleMakeCoffee } = this.props;

    return (
      <main>
        <Head />
        <BrewBar progress={progress} />
        <p>
          <button onClick={handleMakeCoffee} disabled={progress !== 0}>
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
    money: state.get(currencies.MONEY),
    progress: state.get(currencies.BREW_PROGRESS)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMakeCoffee: () => {
      dispatch(startBrew());
    },
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
