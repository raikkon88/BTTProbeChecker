import React, { Component } from 'react';
import axios from 'axios';

export default class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user_nameOrEmail: '',
      user_password: ''
    }
    this.onChangeUserNameOrEmail = this.onChangeUserNameOrEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChangeUserNameOrEmail(e) {
    this.setState({
      user_nameOrEmail: e.target.value
    });
  }

  onChangeUserPassword(e) {
    this.setState({
      user_password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const user = {
      user_nameOrEmail: this.state.user_nameOrEmail,
      user_password: this.state.user_password
    };

    axios.post('http://localhost:4000/auth/login/', user)    
      .then(res => console.log(res.data));

    this.setState({
      user_nameOrEmail: '',
      user_password: ''
    })
  }

  render() {
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Email: </label>
                <input  type="email"
                        className="form-control"
                        value={this.state.user_nameOrEmail}
                        onChange={this.onChangeUserNameOrEmail}
                        required
                        />
              </div>
              <div className="form-group"> 
                <label>Password: </label>
                <input  type="password"
                        className="form-control"
                        value={this.state.user_password}
                        onChange={this.onChangeUserPassword}
                        required
                        />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
        </div>
    )
  }
}
