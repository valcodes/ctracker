import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import ListItem from "material-ui/List/ListItem";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";

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
    window.location.href = "/login";
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
        this.setState({
          userid: response.data.authid,
          name: response.data.name
        });
    });
  }

  render() {
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
                <div style={{ color: "white", cursor: "default" }}>
                  {"Hey, " + this.state.name}
                </div>
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem primaryText="Home" onClick={this.handleClose} />
          </Link>
          <Link to="/portfolio" style={{ textDecoration: "none" }}>
            <MenuItem primaryText="Portfolio" onClick={this.handleClose} />
          </Link>

          <MenuItem
            primaryText="Sign out"
            onClick={() => this.handleLogout()}
          />
        </Drawer>
      </div>
    );
  }
}
