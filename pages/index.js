import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import currencies from "../currencies";
import { serialize, deserialize } from "json-immutable";
import { brewCoffee, startBrew, buyPot, sellCoffee, buyBrewer } from "../store";
import { start } from "../game";
import Head from "../lib/head.js";
import BrewBar from "../lib/BrewBar";
import { create } from "domain";
import { Pot, Coffee, Brewer } from "../pouch";

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

const CoffeeCur = createCurrency("☕️ Coffee");
const Money = createCurrency("💵 Money");
const Pots = createCurrency("🏺 Pot", "Makes more coffee per brew");
const BrewerCur = createCurrency("🧙‍♀️ Brewer", "Passively makes coffee");

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
      brewers,
      progress,
      handleMakeCoffee,
      handleSellCoffee,
      handleBuyPot,
      handleBuyBrewer,
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
            Sell Coffee (${costs.coffee})
          </LinkButton>

          <LinkButton onClick={handleBuyPot} disabled={costs.pot > money}>
            Buy Pot (${costs.pot})
          </LinkButton>

          <LinkButton onClick={handleBuyBrewer} disabled={costs.brewer > money}>
            Buy Brewer (${costs.brewer})
          </LinkButton>
        </section>

        <br />

        <section>
          <CoffeeCur count={coffee} />
          <Money count={money} />
          <Pots count={pots} />
          <BrewerCur count={brewers} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE),
    money: state.get(currencies.MONEY),
    pots: state.get(currencies.POTS),
    brewers: state.get(currencies.BREWERS),
    progress: state.get(currencies.BREW_PROGRESS),
    cupsPerBrew: state.get(currencies.CUPS_PER_BREW),
    costs: {
      coffee: Coffee.cost(state).get(currencies.MONEY),
      pot: -Pot.cost(state).get(currencies.MONEY),
      brewer: -Brewer.cost(state).get(currencies.MONEY)
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
    handleBuyBrewer: () => {
      dispatch(buyBrewer());
    },
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
