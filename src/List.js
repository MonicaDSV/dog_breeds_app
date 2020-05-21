import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class List extends Component {
  mapguesses = (guesses) => {
    return guesses.map((obj) => {
      return <div>guess: {obj.guess}</div>;
    });
  };
  render() {
    const { guesses } = this.props;
    return <div className="App">{this.mapguesses(guesses)}</div>;
  }
}

export default List;
