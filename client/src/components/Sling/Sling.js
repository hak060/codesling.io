import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import { throttle } from 'lodash';

import Button from '../globals/Button';
import StdOut from './StdOut';
import EditorHeader from './EditorHeader';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

import axios from 'axios';

class Sling extends Component {
  state = {
    text: '',
    stdout: '',
    brandenBar: false
  }

  runCode = () => {
    this.socket.emit('client.run');
  }
      
 async componentDidMount() {
    const slingId = this.props.slingId;
    //console.log('process.env.REACT_APP_SOCKET_SERVER_URL ===== ',process.env.REACT_APP_SOCKET_SERVER_URL);
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/slings/${slingId}`);
    // console.log('this is data containing password', data);
    // console.log('this is data containing password', data.sling);
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: slingId,
        password: data.sling.password
      }
    });

      this.socket.on('connect', () => {
      this.socket.emit('client.ready');
      // console.log('process.env.REACT_APP_SOCKET_SERVER_URL ===== ',process.env.REACT_APP_SOCKET_SERVER_URL);
      //  console.log('data is tanananananananananan ', data)
      let answer = prompt('type a password or leave blank if there is no password');
      // console.log(data.sling.password,  '    just to be sure')
      if(data.sling.password !== answer){
        this.socket.disconnect();
        this.showBrandenBar();
      }
    });

    this.socket.on('server.initialState', ({ id, text }) => {
      this.setState({ id, text });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.run', ({ stdout }) => {
      this.setState({ stdout });
    });

    window.addEventListener('resize', this.setEditorSize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.setEditorSize);
  }

  showBrandenBar = async () => {
    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    this.setState({ brandenBar: true });
    await wait(5000);
    await this.setState({ brandenBar: false });
    await window.location.reload();
  }

  sendTranscript = () => {
    // console.log('Transcript Button was pressed');
    var codeinput = this.state.text || '';
    var codeoutput = this.state.stdout || '';
    // console.log('this.state.text INPUT:', codeinput);
    // console.log('this.state.stdout OUTPUT:', codeoutput);
    
  }

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
  }, 250)

  sendEmail = throttle((editor, metadata, value) => {
    this.socket.emit('client.email', { text: value });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    // give the component a reference to the CodeMirror instance
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    return (
      <div className="sling-container">
        <EditorHeader />
        <div className="code-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.text}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="stdout-container">
          {this.state.brandenBar ? <div className="ticket-results">
            <div><h1>Brendan bot: You Messed Up Real Bad!!!</h1></div>
            <img src='https://cdn.discordapp.com/attachments/380047428050747393/381164687795945473/brendan.gif' />
            </div> : null}
          <Button
            className="run-btn"
            text="Run Code"
            backgroundColor="red"
            color="white"
            onClick={this.runCode}
          />
          <StdOut 
            text={this.state.stdout}
          />
          <Button
            className="run-btn"
            text="Send Email"
            backgroundColor="red"
            color="black"
            onClick={this.sendEmail}
          />
          <Button
            className="run-btn"
            text="Send Transcript"
            backgroundColor="red"
            color="black"
            onClick={this.sendTranscript}
          />
        </div>
      </div>
    );
  }
}

export default Sling;
