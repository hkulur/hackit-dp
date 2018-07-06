import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CraftBoard from "./CraftBoard";
import Builder from "./Builder";
import BuilderTest from './BuilderTest';
class App extends Component {
   render() {
      return (
         <Router>
            <Switch>
               <Route path='/builder/' component={Builder} />
               <Route path='/builder-test/' component={BuilderTest} />
               <Route path='/' component={CraftBoard} />
            </Switch>
         </Router>
      );
   }
}
export default App;
