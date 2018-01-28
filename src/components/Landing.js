import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
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
        this.setState({
          coins: results.data
        });
      })
      .catch(console.log);
  }

  render() {
    // console.log(this.state.coins);
    const data = this.state.coins;
    const columns = [
      {
        Header: "Coin Name",
        accessor: "name"
      },
      {
        Header: "Market Cap",
        accessor: "market_cap_usd",

        sortMethod: function(a, b) {
          return a - b;
        }
      },
      {
        Header: "Price (USD)",
        accessor: "price_usd",
        sortMethod: function(a, b) {
          return a - b;
        }
      },
      {
        Header: "24hr change",
        accessor: "percent_change_24h",
        sortMethod: function(a, b) {
          return a - b;
        }
      }
    ];
    console.log(columns);
    // const coinDisplay = this.state.coins.map((coin, index) => {
    //   return (
    //     <Table>
    //       <TableHead key={1}>
    //         <TableRow key={1}>
    //           <TableCell>Coin Name</TableCell>
    //           <TableCell>Market Cap (USD)</TableCell>
    //           <TableCell>Price (USD)</TableCell>
    //           <TableCell>24hr Change (%)</TableCell>
    //           <TableCell>Watch</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {/* {this.state.coins.map((coin, index) => {
    //         return ( */}
    //         <TableRow key={index}>
    //           <TableCell>
    //             {coin.name} ({coin.symbol})
    //           </TableCell>
    //           <TableCell>
    //             {numeral(coin.market_cap_usd).format("$0,0")}
    //           </TableCell>
    //           <TableCell>
    //             {numeral(coin.price_usd).format("$0,0.0000")}
    //           </TableCell>
    //           <TableCell>
    //             {numeral(coin.percent_change_24h).format("0.00")}%
    //           </TableCell>
    //           <TableCell>Add to watch list</TableCell>
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //   );
    // });

    return (
      <div className="coin-header">
        {" "}
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}
