import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

const Control = props => (
  <tr>
      <td>{props.control.uuidAction}</td>
      <td>{props.control.name}</td>
      <td>{props.control.type}</td>
      <td>{props.control.room}</td>
      <td>{props.control.cat}</td>
      <td><input className="checkbox" key={props.id} name={props.control.uuidAction} type="checkbox"/> </td>
  </tr>
)

export default class ConfigureServer extends Component {

  constructor(props) {
      super(props);
      this.state = {
        server: {},
        controls: []
      }
      this.onNextButtonClicked = this.onNextButtonClicked.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/server/'+this.props.match.params.id, 
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => {
            this.setState({
                server: response.data
            })  
            axios.get('http://' + this.state.server.server_url + ":" + this.state.server.server_port + "/data/LoxAPP3.json",  
             { withCredentials: true,  auth: {  username: this.state.server.server_user + '' , password: this.state.server.server_password + '' }})
            .then(response => {
              this.setState({
                controls: response.data.controls
              })
            })
            .catch(error => {
              console.log(error);
            });         
        })
        .catch(error => {
          console.log(error);
        })
  }

  onNextButtonClicked(){
    $( "input:checked" ).map((index, item) => {

      let serverN = this.state.server;
      
      /**
       * TODO : M'he quedat aquí, se'm repeteixen els probes, hem de mirar si hi son i treure'ls.
       */
      var found = false;
      for(var element in serverN.server_probes){
        if(element._id === item.name){
          found = true;
          break;
        }
      }
      if(!found){
        let control = this.state.controls[item.name];

        serverN.server_probes.push({
          _id: control.uuidAction,
          probe_name: control.name,
          probe_type: control.type,
          probe_room: control.room,
          probe_category: control.cat,
          probe_server: serverN._id,
          probe_lectures: []
        });
  
        this.setState({
          server: serverN
        })
        
      console.log(this.state.server);
      
      axios.post('http://localhost:4000/server/update/'+this.props.match.params.id, this.state.server,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(response => {
          console.log("Well Done!!");
        }).catch(error => {
          console.log("Failed to update server ---> " + error);
        });
      }
    });
  }


  ControlsList(){
    if(this.state.controls === undefined){
      return <tr><td>No Controls found</td></tr>
    }
    else{
      var controlList = [];
      for(var key in this.state.controls){
        controlList.push(this.state.controls[key]);
      }

      return controlList.map(function(currentControl, i){
        return <Control control={currentControl} key={i}/>;
      })
    }
  }

  render() {
    return (
      <div>
        <div className="title-container">
          <h3 className="col-xs-10">{this.state.server.server_name}</h3>
          <button type="button" className="btn btn-outline-primary" onClick={this.onNextButtonClicked}>Next</button>
        </div>
        <p>Select which controls will you store under this Server</p>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Room</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              { this.ControlsList() }
            </tbody>
        </table>
      </div>
    )
  }
}