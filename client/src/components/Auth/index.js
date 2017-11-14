import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthHeader from './AuthHeader';
import Login from './Login';
import Signup from './Signup';

const Auth = () => (
  <div className="auth-container">
    <AuthHeader />
    <Switch>
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/signup" exact component={Signup} />
    </Switch>
  </div>
);

export default Auth;
