import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Portfolio from "./components/Portfolio";
import News from "./components/News";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/news" component={News} />
  </Switch>
);
