import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import currencies from "../currencies";
import { serialize, deserialize } from "json-immutable";
import { brewCoffee, startBrew, buyPot, sellCoffee } from "../store";
import { start } from "../game";
import Head from "../lib/head.js";
import BrewBar from "../lib/BrewBar";
import { create } from "domain";
import { Pot } from "../pouch";

const createCurrency = (label, subtitle) => ({ count }) => {
  const sub = subtitle ? (
    <span>
      {"* "}
      {subtitle}
      <style jsx>{`
        color: #718093;
      `}</style>
    </span>
  ) : null;

  return (
    <div>
      <p>
        <span>{label} </span> {"~"} {count.toFixed(1)}
      </p>
      {sub}
    </div>
  );
};

const Coffee = createCurrency("☕️ Coffee");
const Money = createCurrency("💵 Money");
const Pots = createCurrency("🏺 Pot", "Makes more coffee per brew");

const LinkButton = ({ children, onClick, disabled }) => (
  <p>
    <button className="link" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </p>
);

class Main extends React.Component {
  componentDidMount() {
    start(this.props.dispatch);
  }

  render() {
    const {
      coffee,
      money,
      pots,
      progress,
      handleMakeCoffee,
      handleSellCoffee,
      handleBuyPot,
      cupsPerBrew,
      costs
    } = this.props;

    return (
      <main>
        <Head />
        <section>
          <BrewBar progress={progress} />
          <LinkButton onClick={handleMakeCoffee} disabled={progress !== 0}>
            Make Coffee ({cupsPerBrew} cups)
          </LinkButton>

          <LinkButton onClick={handleSellCoffee} disabled={coffee <= 0.0}>
            Sell Coffee
          </LinkButton>

          <LinkButton onClick={handleBuyPot} disabled={costs.pot > money}>
            Buy Pot (${costs.pot})
          </LinkButton>
        </section>

        <br />

        <section>
          <Coffee count={coffee} />
          <Money count={money} />
          <Pots count={pots} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE),
    money: state.get(currencies.MONEY),
    progress: state.get(currencies.BREW_PROGRESS),
    pots: state.get(currencies.POTS),
    cupsPerBrew: state.get(currencies.CUPS_PER_BREW),
    costs: {
      pot: -Pot.cost(state).get(currencies.MONEY)
    }
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
    handleSellCoffee: () => {
      dispatch(sellCoffee());
    },
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
