import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import './Auth.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    let { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/auth`, {
      username,
      password
    });
    console.log('user', data)
    const { accessToken, email } = data;
    console.log('email', email)
    console.log('props', this.props)
    console.log('in login, accessToken', accessToken);
    localStorage.setItem('token', accessToken);
    //localStorage.setItem('username', username);
    localStorage.setItem('username', username);
    localStorage.setItem('email', JSON.stringify(email));
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="login-form-container">
        <form 
          className="auth-form"
          onSubmit={this.handleLoginSubmit}
        >
          <h2>Login</h2>
          <p>
            Don't have an account?
            <span className="auth-link">
              <Link to="/auth/signup">
                Sign up
              </Link>
            </span>
          </p>
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <Button
            backgroundColor="red"
            color="white"
            text="Log In"
            onClick={this.loginClick}
          />
        </form>
      </div>
    );
  }
}

export default Login;
