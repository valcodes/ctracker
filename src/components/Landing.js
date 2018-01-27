import React, { Component } from "react";

import axios from "axios";
import numeral from "numeral";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

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
    const coinDisplay = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coin Name</TableCell>
            <TableCell>Market Cap (USD)</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24hr Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.coins.map((coin, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  {coin.name} ({coin.symbol})
                </TableCell>
                <TableCell>
                  {" "}
                  {numeral(coin.market_cap_usd).format("$0,0")}
                </TableCell>
                <TableCell>
                  {numeral(coin.price_usd).format("$0,0.0000")}
                </TableCell>
                <TableCell>{coin.percent_change_24h} </TableCell>
                <TableCell>Add to watch list</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );

    return <div className="coin-header">{coinDisplay}</div>;
  }
}
