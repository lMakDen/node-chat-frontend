import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Auth, Home } from './pages'

const App = ({ isAuth }) => {
  return (
    <div className="wrapper">
      <Route exact path={['/signIn', '/signUp', '/signUp/verify']} component={Auth} />
      <Route exact path='/' render={() => isAuth ? <Home /> : <Redirect to='/signIn' />} />
    </div>
  );
}

export default connect(
  ({ user: { isAuth } }) => ({ isAuth })
)(App);
