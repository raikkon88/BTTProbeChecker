import React, { Component } from 'react';
import axios from 'axios';

const Control = props => (
  <tr>
      <td>{props.control.probe_uuidAction}</td>
      <td>{props.control.probe_name}</td>
      <td>{props.control.probe_type}</td>
      <td>{props.control.probe_room}</td>
      <td>{props.control.probe_category}</td>
      <td><input onChange={props.handle} defaultChecked={props.control.probe_checked} className="checkbox" key={props.id} name={props.control.probe_uuidAction} type="checkbox"/> </td>
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
      this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/server/'+this.props.serverId, 
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => {
            let serverReceived = response.data;
            this.setState({
                server: serverReceived
            })  
            
            axios.get('http://' + this.state.server.server_url + ":" + this.state.server.server_port + "/data/LoxAPP3.json",  
            { withCredentials: true,  auth: {  username: this.state.server.server_user + '' , password: this.state.server.server_password + '' }})
            .then(response => {

              let controls = []; 

              for(var elementId in response.data.controls){

                let element = response.data.controls[elementId];
                
                controls.push({
                  probe_uuidAction: element.uuidAction,
                  probe_name: element.name,
                  probe_type: element.type,
                  probe_room: element.room,
                  probe_category: element.cat,
                  probe_server: serverReceived._id,
                  probe_checked: this.state.server.server_probes.filter(el => el.probe_uuidAction === element.uuidAction).length > 0,
                  probe_lectures: []
                });
              }
              this.setState({
                controls: controls
              });
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
    console.log(this.state.server.server_probes);
    axios.post('http://localhost:4000/server/update/'+this.props.serverId, this.state.server,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
      .then(response => {
        console.log(response);
        window.location = "/server/" + this.state.server._id;
      }).catch(error => {
        console.log("Failed to update server ---> " + error);
      });
  }

  /**
   * Mirem en quin estat està l'input i l'afegim o no al servidor.
   * @param {*} element És l'input
   */
  handleCheck(element){

    if(element.target.checked){
      let control = this.state.controls.filter(el => el.probe_uuidAction === element.target.name)[0];
      this.state.server.server_probes.push(control)
    }
    else{
      this.state.server.server_probes = this.state.server.server_probes.filter(el => el.probe_uuidAction !== element.target.name);
    }
  }

  ControlsList(component){
    return this.state.controls.map(function(currentControl, i){
      return <Control handle={component.handleCheck} control={currentControl} key={i} />;
    })
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
              { this.ControlsList(this) }
            </tbody>
        </table>
      </div>
    )
  }
}