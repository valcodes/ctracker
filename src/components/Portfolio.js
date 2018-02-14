import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import numeral from "numeral";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
// import moment from "moment";
// import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import "./Landing.css";
export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      search: [],
      userid: [],
      coinid: []
    };
    // this.getCoin = this.getCoin.bind(this);
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });

    axios.get("/api/favorites").then(response => {
      let promiseArr = response.data[0].array_agg.map(element =>
        axios.get(`/api/getSingleCoin/${element}`)
      );
      Promise.all(promiseArr)
        .then(response => {
          console.log(response);
          response.map(element => console.log(element.data[0]));
          // this.setState({ coins: response });
          // let coinArr = [];
          // console.log(response);

          // for (let i = 0; i < response.data.length; i++) {
          //   coinArr = response.data.concat(response.data[i]);
          // }
          // coinArr.push(response.data[0]);
          // console.log(coinArr);

          // data received from coinmarketcap.com api
        })

        .catch(console.log);
    });

    // axios.get("/api/favorites").then(response => {
    //   // getting coin ids from favorites and using them to get live data from the following api call

    //   response.data[0].array_agg.forEach(element => {
    //     axios
    //       .all([axios.get(`/api/getSingleCoin/${element}`)])

    //       .then(
    //         axios.spread(response => {
    //           let coinArr = [];
    //           // console.log(response);

    //           // for (let i = 0; i < response.data.length; i++) {
    //           //   coinArr = response.data.concat(response.data[i]);
    //           // }
    //           coinArr.push(response.data[0]);
    //           console.log(coinArr);

    //           // data received from coinmarketcap.com api
    //         })
    //       )
    //       .catch(console.log);
    //   });
    // });
  }

  render() {
    console.log(this.state.coins);
    let data = this.state.coins;
    // console.log(data);
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
              {/* <IconButton >
                <ContentAdd  />
              </IconButton> */}
              <FloatingActionButton mini>
                <ContentAdd />
              </FloatingActionButton>
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
                // onClick: e => {
                //   console.log(rowInfo.original.id);
                onClick: () => {
                  this.addToPortfolio(rowInfo.original.id);
                }
              };
            }}
          />
        </Paper>
      </div>
    );
  }
}
