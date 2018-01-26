import React, { Component } from "react";
import CryptoRow from "./CryptoRow";
import axios from "axios";
import numeral from "numeral";

import "./Landing.css";

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
        <CryptoRow
          cardtext={
            <div className="coin-container" key={index}>
              <div>
                {coin.name} ({coin.symbol})
              </div>
              <div> {numeral(coin.market_cap_usd).format("$0,0")}</div>
              <div> {numeral(coin.price_usd).format("$0,0.0000")}</div>
              <div>{coin.percent_change_24h} %</div>
              <div>Add to watch list </div>
            </div>
          }
        />
      );
    });
    return <div>{coinDisplay}</div>;
  }
}
