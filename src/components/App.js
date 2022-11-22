import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './Home'
import Config from './Config'
import Game from './Game'


const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/config" component={Config} />
      <Route exact path="/game" component={Game} />
    </Switch>
  </div>
);

export default App;
