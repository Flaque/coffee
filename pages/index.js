import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { currencies } from "../merchant";
import { serialize, deserialize } from "json-immutable";

const Coffee = ({ count }) => <p>{count} Coffees</p>;

const Main = ({ coffee }) => (
  <main>
    <Coffee count={coffee} />
  </main>
);

const mapStateToProps = state => {
  return {
    coffee: state.get(currencies.COFFEE)
  };
};

export default connect(mapStateToProps)(Main);
