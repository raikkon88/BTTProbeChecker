import React, { Component } from 'react';
import axios from 'axios';

export default class CreateServer extends Component {

  constructor(props) {
      super(props);

      this.state = {
        server_name: '',
        server_url: '',
        server_user: '',
        server_port: '',
        server_password: ''
      }
      this.onChangeServerName = this.onChangeServerName.bind(this);
      this.onChangeServerUrl = this.onChangeServerUrl.bind(this);
      this.onChangeServerUser = this.onChangeServerUser.bind(this);
      this.onChangeServerPort = this.onChangeServerPort.bind(this);
      this.onChangeServerPassword = this.onChangeServerPassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeServerName(e) {
    this.setState({
      server_name: e.target.value
    });
  }

  onChangeServerUrl(e) {
    this.setState({
      server_url: e.target.value
    });
  }

  onChangeServerUser(e) {
    this.setState({
      server_user: e.target.value
    });
  }

  onChangeServerPort(e) {
    this.setState({
      server_port: e.target.value
    });
  }

  onChangeServerPassword(e) {
    this.setState({
      server_password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.server_name}`);
    console.log(`Todo Description: ${this.state.server_url}`);
    console.log(`Todo Responsible: ${this.state.server_user}`);
    console.log(`Todo Priority: ${this.state.server_port}`);
    console.log(`Todo Priority: ${this.state.server_password}`);
    
    const newServer = {
      server_name: this.state.server_name,
      server_url: this.state.server_url,
      server_user: this.state.server_user,
      server_password: this.state.server_password,
      server_port: this.state.server_port
    };

    axios.post('http://localhost:4000/server/add', newServer)
      .then(res => console.log(res.data));

    this.setState({
      server_name: '',
      server_url: '',
      server_user: '',
      server_port: '',
      server_password: ''
    })
  }


  render() {
      return (
        <div style={{marginTop: 10}}>
          <h3>Create New Todo</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                  <label>Server Name: </label>
                  <input  type="text"
                          className="form-control"
                          value={this.state.server_name}
                          onChange={this.onChangeServerName}
                          />
              </div>
              <div className="form-group">
                  <label>Server Url: </label>
                  <input 
                          type="text" 
                          className="form-control"
                          value={this.state.server_url}
                          onChange={this.onChangeServerUrl}
                          />
              </div>
              <div className="form-group">
                  <label>Server User: </label>
                  <input 
                          type="text" 
                          className="form-control"
                          value={this.state.server_user}
                          onChange={this.onChangeServerUser}
                          />
              </div>
              <div className="form-group">
                  <label>Server Password: </label>
                  <input 
                          type="password" 
                          className="form-control"
                          value={this.state.server_password}
                          onChange={this.onChangeServerPassword}
                          />
              </div>
              <div className="form-group">
                  <label>Server Port: </label>
                  <input 
                          type="number" 
                          className="form-control"
                          value={this.state.server_port}
                          onChange={this.onChangeServerPort}
                          />
              </div>
              <div className="form-group">
                  <input type="submit" value="Create Todo" className="btn btn-primary" />
              </div>
          </form>
      </div>
      )
  }
}