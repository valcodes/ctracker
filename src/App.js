import React, { Component } from "react";

import "./App.css";
import router from "./router";
import Navbar from "./components/Navbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Navbar />
            {router}
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
