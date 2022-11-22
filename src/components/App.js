import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './Home'
import Config from './Config'
import Game2 from './Game2'



const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Config} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/" component={Home} />
      <Route exact path="/config" component={Config} />
      <Route exact path="/game2" component={Game2} />
    </Switch>
  </div>
);

export default App;
