import React, { Component } from "react";
import CryptoRow from "./CryptoRow";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }

  render() {
    return (
      <div>
        <CryptoRow cardtext={"test"} />
      </div>
    );
  }
}
