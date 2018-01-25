import React, { Component } from "react";
import CryptoRow from "./CryptoRow";
import axios from "axios";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3001/api/getcoins")
      .then(results => {
        this.setState({ coins: results.data });
      })
      .catch(console.log);
  }

  render() {
    console.log(this.state.coins);
    const coinDisplay = this.state.coins.map((coin, index) => {
      return (
        <div className="coin-container" key={index}>
          {coin.name}
          {coin.symbol}
          price {coin.price_usd}
        </div>
      );
    });
    return (
      <div>
        <CryptoRow cardtext={coinDisplay} />
      </div>
    );
  }
}
