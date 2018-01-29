import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import moment from "moment";

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
        Header: "Symbol",
        accessor: "symbol"
      },
      {
        Header: "Coin Name",
        headerClassName: "pink",
        accessor: "name",

        Cell: row => <div>{row.value}</div>
      },
      {
        Header: "Market Cap",
        headerClassName: "pink",
        accessor: "market_cap_usd",

        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => <div>{numeral(row.value).format("$0,0")}</div>
      },
      {
        Header: "Price (USD)",
        headerClassName: "pink",
        accessor: "price_usd",
        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => <div>{numeral(row.value).format("$0,0.0000")}</div>
      },
      {
        Header: "Date",
        Cell: moment().format("l")
      },
      {
        Header: "24hr change",
        headerClassName: "pink",
        accessor: "percent_change_24h",
        sortMethod: function(a, b) {
          return a - b;
        },

        Cell: row => (
          <div style={{ color: row.value > 0 ? "green" : "red" }}>
            {numeral(row.value).format("0.00") + " %"}
          </div>
        )
      }
    ];

    return (
      <div className="coin-header">
        <Paper
          style={({ width: "80%" }, { align: "center" }, { margin: "3%" })}
        >
          <ReactTable data={data} columns={columns} className="-highlight " />
        </Paper>
      </div>
    );
  }
}
