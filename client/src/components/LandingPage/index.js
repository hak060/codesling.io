import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';
import { FormGroup } from 'react-bootstrap';

import './LandingPage.scss';

export default class LandingPage extends Component {
  state = {
    loading: false,
    slingId: '',
    roomId: '',
  }


  forceSlingId = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/force-sling`,{
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        roomId: this.state.roomId
      });
      console.log('this is fetchSlingId data: ===',data);
      const { slingId } = data;
      this.props.history.push({
        pathname: `/${slingId}`,
      });
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
    }
    console.log('forced one invoked');
  }

  fetchSlingId = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });
      console.log('this is fetchSlingId data: ===', data);
      const { slingId } = data;
      this.props.history.push({
        pathname: `/${slingId}`,
      });
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
    }
  }

  handleChange = (e) => {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj, () => { console.log('new state: ', this.state) });
  }

  handleStartProgrammingClick = () => {
    this.setState({
      loading: true,
    }, this.fetchSlingId);
  }

  handleStartPrivateProgrammingClick = () => {
    this.setState({
      loading: true,
    }, this.forceSlingId);
  }

  render() {
    return (
      <div>
        <div className="landing-page-container">
          <Logo
            className="landing-page-logo"
          /></div>
        <div id="roomnumber"><label> RoomNumber: <input type="text" name="roomId" value={this.state.roomId} onChange={this.handleChange} /></label></div>
        <div>
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
            text='enter selected room'
            onClick={this.handleStartPrivateProgrammingClick}
          />
          <br></br>
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
            text='generate random room'
            onClick={this.handleStartProgrammingClick}
          />
         
        </div>
      </div>
    )
  }
}

//export default LandingPage;
