import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Probe = props => (
    <tr>
        <td>{props.probe._id}</td>
        <td>{props.probe.probe_name}</td>
        <td>
            <Link to={"/server/probes/"+props.probe._id}>View</Link>
        </td>
        <td>
            <Link to={"/server/probes/edit/"+props.probe._id}>Edit</Link>
        </td>
    </tr>
)

export default class ProbeList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        server: {}
      };
    }

    componentDidMount() {
      console.log(this.props.match.params.id);
      axios.get('http://localhost:4000/server/'+this.props.match.params.id, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => {
          console.log(response.data);
            this.setState({ 
              server: response.data
            });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    ProbeList() {
      console.log(this.state.server);
      if(this.state.server.server_probes === undefined){
        return <tr><td>No probes found</td></tr>
      }
      else{
        return this.state.server.server_probes.map(function(currentProbe, i){
          console.log(currentProbe);
          return <Probe probe={currentProbe} key={i} />;
        })
      }
    }

    render() {
        return (
            <div>
              <h3 className="col-xs-10">{this.state.server.server_name}</h3>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                  <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th>
                        <th><Link to={{
                            pathname: '/server/' + this.state.server._id + "/create"
                          }} className="col-xs-2">New Probe</Link></th>
                      </tr>
                  </thead>
                  <tbody>
                      { this.ProbeList() }
                  </tbody>
              </table>
            </div>
        )
    }
}