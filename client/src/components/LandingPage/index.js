import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';
import { FormGroup } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';

import './LandingPage.scss';

export default class LandingPage extends Component {
  state = {
    loading: false,
    slingId: '',
    roomId: '',
    isPassword: false,
    password: ''
  }
//   var headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...' 
// }
// axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/force-sling`, data, headers)

//     .then((response) => {
//         dispatch({type: FOUND_USER, data: response.data[0]})
//     })
//     .catch((error) => {
//         dispatch({type: ERROR_FINDING_USER})
//     })

  forceSlingId = async () => {
    let headers = {
      Authorization: `Bearer ${localStorage.token}`
    }
    let data = this.state;
    let url = `${process.env.REACT_APP_REST_SERVER_URL}/api/force-sling`;
    console.log(" this is the data in client landing ", this.state)
    //let that = this;
    //axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/force-sling`, data, headers)

    axios({ method: 'POST', url: url, headers: headers, data: this.state })
      .then(response => {
        console.log('this is forcedSlingId data: ===', response);
        console.log('this is forcedSlingId response.data: ===', response.data);

        const { slingId, password } = response.data;
        console.log('this is forcedSlingId data: ===', password);
        this.props.history.push({
          pathname: `/${slingId}`,
        });
      })
      

  }

  fetchSlingId = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });
     // console.log('this is fetchSlingId data: ===', data);
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

  handleCheckboxChange = () => {
    this.setState(
      { isPassword: !this.state.isPassword },
      () => { console.log('checkbox clicked: ', this.state.isPassword) })
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

          <Checkbox onChange={this.handleCheckboxChange}>
            Create Password
          </Checkbox>
          {this.state.isPassword ? 
            <div id="password"><label> Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
           : null}
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
