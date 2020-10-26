import React from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Search from './components/search';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Jumbotron />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/search' render={(props) => <Search {...props}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
