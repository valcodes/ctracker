import React, { Component } from "react";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import router from "./router";
import Navbar from "./components/Navbar";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Navbar />
          {router}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
