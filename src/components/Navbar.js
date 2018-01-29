import React, { Component } from "react";

import AppBar from "material-ui/AppBar";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBar title="Ctracker" />
      </div>
    );
  }
}
