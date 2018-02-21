import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import FlatButton from "material-ui/FlatButton";
// import moment from "moment";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import ContentClear from "material-ui/svg-icons/content/clear";

import "./Landing.css";
export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      search: [],
      authid: [],
      coinid: [],
      open: false,
      noCoinsDialog: false,
      loginWarningDialog: false
    };
    this.removefromPortfolio = this.removeFromPortfolio.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    // window.location.href = "/login";

    window.location.href = "http://localhost:3001/login";
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      console.log(response);
      if (!response.data) this.setState({ authid: null });
      else this.setState({ authid: response.data.authid });
    });

    console.log(this.state.authid);
    if (this.state.authid.length == 0) {
      console.log("what");
      this.setState({ loginWarningDialog: true });
    } else {
      this.setState({ loginWarningDialog: false });
    }

    axios.get("/api/favorites").then(response => {
      console.log(response);
      if (response.data[0].array_agg === null) {
        // displaying a popup if there are no coins in portfolio
        this.setState({ noCoinsDialog: true });
      } else {
        // getting coin id array from favorites saved in db on the server
        let promiseArr = response.data[0].array_agg.map(element =>
          // mapping through said array and sending  axios get requests for each coin to third party api to get live price data
          axios.get(`/api/getSingleCoin/${element}`)
        );
        Promise.all(promiseArr)
          // using promise.all to get all the data from multiple api calls in same place
          .then(response => {
            const coinArr = response.map(element => element.data[0]);
            this.setState({ coins: coinArr });
          })
          .catch(console.log);
      }
    });
  }
  removeFromPortfolio = coin => {
    axios
      .delete(
        `http://localhost:3001/api/deleteCoin?coinid=${coin}&userid=${
          this.state.authid
        }`
      )
      .then(response => {
        const newPortfolio = this.state.coins;
        console.log(newPortfolio.indexOf(coin));
        for (let i = 0; i < newPortfolio.length; i++) {
          console.log(coin[i]);
          newPortfolio.splice(newPortfolio.indexOf(coin[i]), coin[i + 1]);
        }
        // newPortfolio.splice(newPortfolio.indexOf(coin), 1);
        this.setState({
          coins: newPortfolio,
          open: true,
          coin: coin.toUpperCase()
        });
      })
      .catch(console.log);
  };
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

      {
        Header: "24h Change",
        headerClassName: "pink",
        accessor: "percent_change_24h",

        sortMethod: function(a, b) {
          return a - b;
        },

        Cell: row => (
          <div
            style={{ color: row.value > 0 ? "green" : "red" }}
            className="buttons"
          >
            {numeral(row.value).format("0.00") + " %"}
            <div>
              <FloatingActionButton mini secondary>
                <ContentClear />
              </FloatingActionButton>

              <Snackbar
                open={this.state.open}
                message={this.state.coin + "  deleted from portfolio"}
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
          Portfolio
        </div>
        <Dialog
          title="You are not logged in!"
          actions={
            <div>
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.setState({ loginWarningDialog: false })}
              />
              <FlatButton
                label="login"
                primary={true}
                onClick={() => this.handleLogin()}
              />
            </div>
          }
          modal={false}
          open={this.state.loginWarningDialog}
          onRequestClose={() => this.setState({ loginWarningDialog: false })}
        >
          Please log in to view Portfolio
        </Dialog>
        <Dialog
          title="You have no coins added to portfolio"
          actions={
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.setState({ noCoinsDialog: false })}
            />
          }
          modal={false}
          open={this.state.noCoinsDialog}
          onRequestClose={() => this.setState({ noCoinsDialog: false })}
        >
          Track some cryptos! That lambo isn't going to buy itself!
        </Dialog>
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
                    this.removeFromPortfolio(rowInfo.original.id);
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
