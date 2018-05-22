import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { currencies } from "../merchant";
import { serialize, deserialize } from "json-immutable";
import { makeCoffee } from "../store";

const Coffee = ({ count }) => <p>{count} Coffees</p>;

const Main = ({ coffee, handleMakeCoffee }) => (
  <main>
    <p>
      <button onClick={handleMakeCoffee}> Make Coffee</button>
    </p>
    <Coffee count={coffee} />
  </main>
);

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMakeCoffee: () => {
      dispatch(makeCoffee());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
