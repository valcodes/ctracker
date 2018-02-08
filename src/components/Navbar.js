import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";

import ListItem from "material-ui/List/ListItem";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import axios from "axios";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      userid: []
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // window.location.href = "/login";
    window.location.href = "http://localhost:3001/login";
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      console.log(response);
      if (!response.data) this.setState({ userid: null });
      else
        this.setState({ userid: response.data.id, name: response.data.name });
    });
  }

  render() {
    console.log(this.state.name);
    return (
      <div className="nav">
        <AppBar
          className="nav"
          onLeftIconButtonClick={() =>
            this.setState({ open: !this.state.open })
          }
          iconElementRight={
            <ListItem>
              {this.state.name === "" ? (
                <FlatButton
                  label="Login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                />
              ) : (
                <FlatButton label="Log Out" href="/api/logout" />
              )}
            </ListItem>
          }
        />
        <IconMenu
          open={this.state.open}
          iconButtonElement={<IconButton />}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem primaryText="Home" />
          <MenuItem primaryText="Portfolio" />

          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    );
  }
}
