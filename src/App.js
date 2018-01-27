import React, { Component } from "react";

import "./App.css";
import router from "./router";
import Navbar from "./components/Navbar";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";

class App extends Component {
  render() {
    const muiTheme = createMuiTheme({
      palette: {
        primary: {
          light: "#ffc4ff",
          main: "#ce93d8",
          dark: "#9c64a6",
          contrastText: "#fff"
        },
        secondary: {
          light: "#ffffff",
          main: "#ffcdd2",
          dark: "#cb9ca1",
          contrastText: "#000"
        }
      }
    });
    return (
      <div className="App">
        <div>
          <MuiThemeProvider theme={muiTheme}>
            <Navbar />
            {router}
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
