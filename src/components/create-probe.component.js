import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProbe extends Component {

  constructor(props) {
      super(props);

      this.state = {
        probe_name: '',
        probe_server: this.props.match.params.id
      }
      this.onChangeProbeName = this.onChangeProbeName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeProbeName(e) {
    this.setState({
      probe_name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const newProbe = {
      probe_name: this.state.probe_name,
      probe_server: this.props.match.params.id
    };

    axios.post('http://localhost:4000/server/' + this.props.match.params.id + "/add", newProbe)
    .then(res => console.log(res.data));

    this.setState({
      probe_name: ''
    })
  }


  render() {
      return (
        <div style={{marginTop: 10}}>
          <h3>Create New Probe</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                  <label>Probe Name: </label>
                  <input  type="text"
                          className="form-control"
                          value={this.state.probe_name}
                          onChange={this.onChangeProbeName}
                          required
                          />
              </div>
              <div className="form-group">
                  <input type="submit" value="Create Server" className="btn btn-primary" />
              </div>
          </form>
      </div>
      )
  }
}