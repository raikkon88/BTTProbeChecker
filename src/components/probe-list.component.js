import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import XMLParser  from 'react-xml-parser';

const Probe = props => (
    <tr>
        <td>{props.probe.probe_uuidAction}</td>
        <td>{props.probe.probe_name}</td>
        <td>{props.probe.probe_type}</td>
        <td>{props.probe.probe_category}</td>
        <td>{props.probe.probe_room}</td>
        <td><Link className="btn" to={"/probe/"+props.probe._id}><MdRemoveRedEye /></Link></td>
    </tr>
)

export default class ProbeList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        server: {}
      };
      this.onConfigureButtonClicked = this.onConfigureButtonClicked.bind(this);
    }

    componentDidMount() {
      console.log(this.props.probeId);
      axios.get('http://localhost:4000/server/'+this.props.probeId, 
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
      if(this.state.server.server_probes === undefined){
        return <tr><td>No probes found</td></tr>
      }
      else{
        let server = this.state.server;
        return server.server_probes.map(function(currentProbe, i){
          /*axios.get('http://' + server.server_url + ":" + server.server_port + "/dev/sps/io/" + currentProbe.probe_uuidAction,  
            { withCredentials: true,  auth: {  username: server.server_user + '' , password: server.server_password + '' }})
            .then(result => {
              let xml = new XMLParser().parseFromString(result.data);
              console.log("data received");
              document.getElementById(currentProbe.probe_uuidAction).innerHTML = xml.getElementsByTagName('LL').pop().attributes.value;
            }) */
          return <Probe probe={currentProbe} key={i}/>;
        })
      }
    }

    onConfigureButtonClicked(){
      window.location = "/server/" + this.state.server._id + "/configure"
    }

    render() {
        return (
            <div>
              <div className="title-container">
                <h3 className="col-xs-10">{this.state.server.server_name}</h3>
                <button type="button" className="btn btn-outline-primary" onClick={this.onConfigureButtonClicked}>Configure</button>
              </div>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                  <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Room</th>
                        <th>Last Value</th>
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