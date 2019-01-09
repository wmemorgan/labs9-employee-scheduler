import React, { Component } from 'react';
import axios from 'axios';
import { Global, css } from '@emotion/core';
import { NavLink, Route, Switch } from 'react-router-dom';
import Calendar from './components/Calendar';
import Employees from './components/Employees';
import CreateSchedule from './components/CreateSchedule';
import Billing from './components/Billing';
import Home from './components/Home';
import Dashboard from './components/EmployeeDashboard';
import Settings from './components/Settings';
import fire from './config/fire';
import Login from './components/Login';

import './reset.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

class App extends Component {
  // this will be refactored when we wire up redux, just in place
  // right now to test firebase auth unless this is a use case for hooks
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.authListener();
  }
  //for firebase auth using fire.js in the config folder
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
              font-family: 'Open Sans', sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <h1>hello</h1>

        {this.state.user ? <Home /> : <Login />}
        {/* This nav should be moved to it's own component because it should
        only be accessible on the calender view */}
        <nav>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/shift-calendar">Create Schedule</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
        <Switch>
          <Route path="/employees" render={props => <Employees {...props} />} />
          <Route
            path="/shift-calendar"
            render={props => <CreateSchedule {...props} />}
          />
          <Route path="/billing" render={props => <Billing {...props} />} />
          <Route path="/calendar" render={props => <Calendar {...props} />} />
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route path="/dashboard" render={props => <Dashboard {...props} />} />
          <Route path="/settings" render={props => <Settings {...props} />} />
          <Route path="/login" render={props => <Login {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
