import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

import FlatButton from "material-ui/FlatButton";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title="Ctracker"
          iconElementRight={<FlatButton label="Login" />}
        />
      </div>
    );
  }
}
