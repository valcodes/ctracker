import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import SwapVert from "material-ui/svg-icons/action/swap-vert";
import Snackbar from "material-ui/Snackbar";
import "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      search: [],
      authid: [],
      name: "",
      coin: [],
      open: false
    };
    this.addToPortfolio = this.addToPortfolio.bind(this);
  }
  addToPortfolio = coin => {
    axios
      .post("/api/portfolio", {
        authid: this.state.authid,
        coinid: coin
      })
      .then(response =>
        this.setState({ open: true, coin: coin.toUpperCase() })
      );
  };

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ authid: null });
      else
        this.setState({
          authid: response.data.authid,
          name: response.data.name
        });
    });
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
        headerClassName: "pink-two",
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
        className: "coins",

        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => <div>{numeral(row.value).format("$0,0")}</div>
      },
      {
        Header: "Price (USD)",
        headerClassName: "pink",
        className: "coins",
        accessor: "price_usd",
        sortMethod: function(a, b) {
          return a - b;
        },
        Cell: row => <div>{numeral(row.value).format("$0,0.0000")}</div>
      },

      {
        Header: "24h Change",
        headerClassName: "pink-button",
        accessor: "percent_change_24h",
        className: "coins-button",
        sortMethod: function(a, b) {
          return a - b;
        },

        Cell: row => (
          <div style={{ color: row.value > 0 ? "green" : "red" }}>
            {this.state.name === "" ? (
              <div>{numeral(row.value).format("0.00") + " %"}</div>
            ) : (
              <div className="buttons">
                <div>{numeral(row.value).format("0.00") + " %"}</div>

                <div>
                  <FloatingActionButton mini>
                    <ContentAdd />
                  </FloatingActionButton>
                  <Snackbar
                    open={this.state.open}
                    message={this.state.coin + "  added to portfolio"}
                    autoHideDuration={2000}
                    contentStyle={{
                      backgroundColor: "#00bcd4",
                      borderColor: "#00bcd4"
                    }}
                    bodyStyle={{
                      backgroundColor: "#00bcd4",
                      borderColor: "#00bcd4"
                    }}
                  />
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
        <div className="paper">
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
      </div>
    );
  }
}
