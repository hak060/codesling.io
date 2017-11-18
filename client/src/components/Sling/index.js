import React, { Component } from 'react';
import axios from 'axios';

import Sling from './Sling';

class ProtectedSling extends Component {
  state = {password: '' }

  async componentDidMount() {
    const slingExists = await this.slingExistsinDB();
    if (!slingExists) {
      this.props.history.push({
        pathname: '/slingError',
      });
    }
  }
  
  slingExistsinDB = async () => {
    const slingId = this.props.match.params.slingId
    // console.log('this is the real sling ID', this.props)
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/slings/${slingId}`);
    // console.log('this is the real sling ID', data)
    this.setState(({password: data.sling.password}),() => {console.log('fetched password ==', this.state.password)});
    const { sling } = data
    // console.log('this.state.password', this.state.password)
    return !!sling;
  }

  render() {
    return (
      //this.props.match.params.slingId
      <Sling slingId={this.props.match.params.slingId}
      password={this.state.password} />
    );
  }
}

export default ProtectedSling;
