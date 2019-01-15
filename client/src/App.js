import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'
import { Route, Switch } from 'react-router-dom'
import Calendar from './components/Calendar'
import Employees from './components/Employees'
import CreateSchedule from './components/CreateSchedule'
import Billing from './components/Billing'
import Home from './components/Home'
import Dashboard from './components/EmployeeDashboard'
import Settings from './components/Settings'
import Login from './components/Login'
import Register from './components/Register'
import { Elements, StripeProvider } from 'react-stripe-elements'
import RegisterOwner from './components/RegisterOwner'
import { authenticate } from './actions' // for initial call
import { connect } from 'react-redux'

import './reset.css'
import { registerOwner } from './actions/registerActions'

const serverUrl = process.env.REACT_APP_SERVER_URL

class App extends Component {
  constructor() {
    super()
    this.state = {
      api: null
    }
  }

  componentDidMount() {
    this.props.authenticate()
    // axios
    //   .get(serverUrl, {
    //     headers: { authorization: 'testing' }
    //   })
    //   .then(res => this.setState({ api: res.data.message }))
    //   .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
              font-family: 'Nunito', sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            label {
              font-family: 'Lato', serif;
            }

            a,
            input,
            button {
              text-decoration: none;
              font-family: 'Nunito', sans-serif;
              outline: none;
            }
          `}
        />
        <Route exact path="/" render={props => <Home {...props} />} />

        <StripeProvider apiKey="pk_test_HKBgYIhIo21X8kQikefX3Ei1">
          <Elements>
            <Switch>
              <Route path="/employees" component={Employees} />
              <Route path="/shift-calendar" component={CreateSchedule} />
              <Route path="/register" component={Register} />
              <Route path="/billing" component={Billing} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/dashboard/:id" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" render={props => <Login {...props} />} />
            </Switch>
          </Elements>
        </StripeProvider>

        {/*<h1> get rid of this?
          {this.state.api ? `This is from the API: ${this.state.api}` : null}
        </h1>*/}

        {/* This Switch should be moved to it's own component because it should
        only be accessible on the calender view */}
        <Switch>
          <Route path="/employees" component={Employees} />
          <Route path="/shift-calendar" component={CreateSchedule} />
          <Route path="/register" component={RegisterOwner} />
          <Route path="/billing" component={Billing} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/login" render={props => <Login {...props} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({}) => ({})

export default connect(
  mapStateToProps,
  { authenticate }
)(App)
