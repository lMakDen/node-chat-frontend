import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Auth, Home } from './pages'

const App = ({ isAuth }) => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={['/signIn', '/signUp', '/signUp/verify']} component={Auth} />
        <Route exact path={['/', '/dialog/:id']} render={() => isAuth ? <Home /> : <Redirect to='/signIn' />} />
      </Switch>
    </div>
  );
}

export default connect(
  ({ user: { isAuth } }) => ({ isAuth })
)(App);
