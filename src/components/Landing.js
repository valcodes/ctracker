import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import moment from "moment";
import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      search: [],
      userid: []
    };
    this.addToPortfolio = this.addToPortfolio.bind(this);
  }
  addToPortfolio = coin => {
    axios
      .post("/api/portfolio", {
        userid: this.state.userid,
        coinid: coin
      })
      .then(response => alert(` ${coin.toUpperCase()} added to portfolio`));
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/getcoins")
      .then(results => {
        this.setState({
          coins: results.data
        });
      })
      .catch(console.log);

    axios.get("/api/me").then(response => {
      console.log(response);
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }

  render() {
    let data = this.state.coins;

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
        className: "bold",

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
            {this.state.userid === null ? (
              <div>{numeral(row.value).format("0.00") + " %"}</div>
            ) : (
              <div className="buttons">
                <div>{numeral(row.value).format("0.00") + " %"}</div>

                <div>
                  <FloatingActionButton mini>
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </div>
            )}
          </div>
        )
      }
    ];

    return (
      <div className="coin-header">
        <div className="search">
          <TextField
            hintText="Filter Coins"
            floatingLabelText={<i className="fa fa-search" />}
            type="search"
            data={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          Crypto Price Watch
        </div>

        <Paper>
          <ReactTable
            data={data}
            columns={columns}
            filterable={false}
            resizable={false}
            className="-highlight "
            style={{
              fontSize: ".7em"
            }}
            defaultPageSize={50}
            paginationStyle={{ backgroundColor: "#00bcd4", color: "white" }}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: () => {
                  if (column.Header === "24h Change") {
                    this.addToPortfolio(rowInfo.original.id);
                  }
                }
              };
            }}
          />
        </Paper>
      </div>
    );
  }
}
