import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";
import moment from "moment";

import "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      search: []
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
    let data = this.state.coins;
    console.log(data);
    if (this.state.search) {
      data = data.filter(row => {
        return (
          row.symbol.toLowerCase().includes(this.state.search) ||
          row.name.toLowerCase().includes(this.state.search) ||
          String(row.market_cap_usd).includes(this.state.search) ||
          String(row.price_usd).includes(this.state.search) ||
          String(row.percent_change_24h).includes(this.state.search)
        );
      });
    }
    const columns = [
      {
        Header: "Symbol",
        accessor: "symbol",
        headerClassName: "pink",
        fontWeight: "bold",

        Cell: row => <div>{row.value}</div>
      },
      {
        Header: "Coin Name",
        headerClassName: "pink-one",
        accessor: "name",

        className: "coin-name",
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
      // {
      //   Header: "Date",
      //   Cell: moment().format("l")
      // },
      {
        Header: "24h Change",
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
        {/* <Paper
          style={{
            minWidth: "70%"
          }}
        > */}
        <div className="search">
          <TextField
            hintText="Filter Coins"
            floatingLabelText="Search"
            type="search"
            // filter={AutoComplete.caseInsensitiveFilter}
            data={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          {/* <AutoComplete
            floatingLabelText="Search"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={data}
            hintText="Filter Coins"
            onChange={e => this.setState({ search: e.target.value })}
            // type="search"
          /> */}
          Crypto Price Watch
        </div>
        {/* </Paper> */}
        <Paper
          style={{
            minWidth: "70%"
          }}
        >
          <ReactTable
            data={data}
            columns={columns}
            filterable={false}
            resizable={false}
            className="-highlight "
            style={{
              fontSize: ".7em"
              // minWidth: "65%"
            }}
            defaultPageSize={50}
            paginationStyle={{ backgroundColor: "#00bcd4", color: "white" }}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: e => {
                  console.log(rowInfo.original.id);
                }
              };
            }}
          />
        </Paper>
      </div>
    );
  }
}
