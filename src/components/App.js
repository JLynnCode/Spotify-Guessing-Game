import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import ConfigPage from './Config'
import GamePage from './Game'

const App = () => (
  <div>
    <Route exact path='/' component={Home} />
    <Route exact path='/config' component={ConfigPage} />
    <Route exact path='/game' component={GamePage} />
  </div>
)

export default App
