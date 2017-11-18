import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import debug from '../../../lib/debug';

class Protected extends Component {
  componentDidMount() {
    try {
      const { exp } = jwtDecode(localStorage.token);
      let cutoff = Math.floor(Date.now() / 1000);
      let timeleft = exp - cutoff - 3000;
      console.log('timeleft ======= ', timeleft);
      if (timeleft < 0) {
        localStorage.removeItem('username');
        this.props.history.push('/auth/login');
      }
    } catch (e) {
      debug('error in Protected ', e);
      this.props.history.push('/auth/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    return (
      <Component {...this.props} />
    );
  }
}

export default Protected;
