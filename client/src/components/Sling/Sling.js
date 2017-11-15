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
    stdout: ''
  }

  runCode = () => {
    this.socket.emit('client.run');
  }

 async componentDidMount() {
    const slingId = this.props.slingId;
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/slings/${slingId}`);
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: slingId,
        password: data.sling.password
      }
    });

      this.socket.on('connect', () => {
      this.socket.emit('client.ready');
      
      // console.log('data is tanananananananananan ', data)
      let answer = prompt('type a password or leave blank if there is no password');
      console.log(data.sling.password,  '    just to be sure')
      if(data.sling.password !== answer){
        this.socket.disconnect();
        window.location.reload();
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

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
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
        </div>
      </div>
    );
  }
}

export default Sling;