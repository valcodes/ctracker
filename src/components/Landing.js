import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";

import Divider from "material-ui/Divider";

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
        this.setState({
          coins: results.data
        });
      })
      .catch(console.log);
  }

  render() {
    const data = this.state.coins;
    const columns = [
      {
        Header: "Coin Name",
        headerClassName: "pink",
        accessor: "name",

        Cell: row => (
          <div>
            {row.value}
            <Divider />
          </div>
        )
      },
      {
        Header: "Market Cap",
        headerClassName: "pink",
        accessor: "market_cap_usd",

        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => (
          <div>
            {numeral(row.value).format("$0,0")}
            <Divider />
          </div>
        )
      },
      {
        Header: "Price (USD)",
        headerClassName: "pink",
        accessor: "price_usd",
        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => (
          <div>
            {numeral(row.value).format("$0,0.0000")}
            <Divider />
          </div>
        )
      },
      {
        Header: "24hr change",
        headerClassName: "pink",
        accessor: "percent_change_24h",
        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => (
          <div>
            {numeral(row.value).format("0.00") + " %"}
            <Divider />
          </div>
        )
      }
    ];
    console.log(this.state.coins);
    return (
      <div className="coin-header">
        <Paper>
          <ReactTable
            data={data}
            columns={columns}
            className="-highlight -striped"
          />
          <Divider />
        </Paper>
      </div>
    );
  }
}
