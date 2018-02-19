import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";

import ListItem from "material-ui/List/ListItem";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import axios from "axios";
import Drawer from "material-ui/Drawer";
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
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLogin() {
    // window.location.href = "/login";

    window.location.href = "http://localhost:3001/login";
  }

  handleLogout() {
    axios.get("/logout").then(response => response.data);
    window.location.href = "/";
  }

  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else
        this.setState({ userid: response.data.id, name: response.data.name });
    });
  }

  render() {
    // console.log(this.state.name);
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
                  style={{ color: "white" }}
                  label="Login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                />
              ) : (
                <FlatButton
                  label={"Hey," + "  " + this.state.name}
                  href="/logout"
                  style={{ color: "white" }}
                />
              )}
            </ListItem>
          }
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
          iconButtonElement={<IconButton />}
        >
          <MenuItem primaryText="Home" onClick={this.handleClose} href="/" />
          <MenuItem
            primaryText="Portfolio"
            onClick={this.handleClose}
            href="portfolio"
          />

          <MenuItem
            primaryText="Sign out"
            onClick={() => this.handleLogout()}
            // href="/logout"
          />
        </Drawer>
      </div>
    );
  }
}
