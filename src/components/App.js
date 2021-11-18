import React from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Profile from './Profile'
import Create from './Create'
import './App.css'

function App() {
console.log('test')

  return (
    <Container className='App'>
      {/* <div className="w-100" style={{ maxWidth: '400px' }}> */}
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/create" component={Create} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      {/* </div> */}
    </Container>
  )
}

export default App;

