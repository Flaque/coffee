import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import currencies from "../currencies";
import { serialize, deserialize } from "json-immutable";
import { brewCoffee, startBrew, buyCoffee } from "../store";
import { start } from "../game";
import Head from "../lib/head.js";
import BrewBar from "../lib/BrewBar";
import { create } from "domain";

const createCurrency = (label, subtitle) => ({ count }) => {
  if (count <= 0) {
    return null;
  }

  const sub = subtitle ? <p>{subtitle}</p> : null;

  return (
    <div>
      <p>
        <span>{label} </span> {"~"} {count.toFixed(1)}
        <style jsx>{`
          span {
            color: #0097e6;
          }
        `}</style>
      </p>
      {sub}
    </div>
  );
};

const Coffee = createCurrency("☕️ Coffee");
const Money = createCurrency("💵 Money");
const Pots = createCurrency("🏺 Pot", "Make more coffee per brew");

class Main extends React.Component {
  componentDidMount() {
    start(this.props.dispatch);
  }

  render() {
    const { coffee, money, pots, progress, handleMakeCoffee } = this.props;

    return (
      <main>
        <Head />
        <BrewBar progress={progress} />
        <p>
          <button onClick={handleMakeCoffee} disabled={progress !== 0}>
            {"☕️"} Make Coffee {"☕️"}
          </button>
        </p>

        <hr />

        <Coffee count={coffee} />
        <Money count={money} />
        <Pots count={pots} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE),
    money: state.get(currencies.MONEY),
    progress: state.get(currencies.BREW_PROGRESS),
    pots: state.get(currencies.POTS)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMakeCoffee: () => {
      dispatch(startBrew());
    },
    handleBuyPot: () => {
      dispatch(buyPot());
    },
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
