import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CraftBoard from "./CraftBoard";
import Builder from "./Builder";
import FolderStructure from './views/FolderStructure';
import RegisterComponent from "./RegisterComponent";
import DesignGround from "./DesignGround";
import BuilderTest from './BuilderTest';
class App extends Component {
   render() {
      return (
         <Router>
            <Switch>
               <Route path='/base/' component={FolderStructure} />
               <Route path='/builder/' component={Builder} />
               <Route path='/builder-test/' component={BuilderTest} />
               <Route path='/register-comp/' component={RegisterComponent} />
               <Route path='/design-ground/' component={DesignGround} />
               <Route path='/' component={CraftBoard} />
            </Switch>
         </Router>
      );
   }
}
export default App;
