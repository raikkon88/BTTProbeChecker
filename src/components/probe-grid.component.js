import React, { Component } from 'react';
import axios from 'axios';

const Lecture = props => (
  <tr>
      
  </tr>
)

export default class ProbeGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
        probes: {}
      };
  }

  componentDidMount(){
    console.log('http://localhost:4000/server/grid/'+this.props.match.params.id);
    axios.get('http://localhost:4000/server/grid/'+this.props.match.params.id,  { 
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
          console.log(response.data);
            this.setState({ 
              probes: response.data
            });
        })
        .catch(function (error){
            console.log(error);
        })
  }

  HeaderTable(){
    /*return this.state.probes.map(function(currentProbe, i){
      return <th>{currentProbe.probe_name}</th>;
    })*/
  }

  BodyTable(){
    /*
    let max = 0;
    let total_dates = [];
    this.state.probes.map(probe => {
      if(probe.probe_lectures.length > max){
        max = probe.probe_lectures.length;
      }
      dates = []
      probe.probe_lectures.map(lecture => {
        dates.push(lecture.lecture_date);
      })
      total_dates = new Set(total_dates, dates);
    })

*/
  }

  render() {
    return (
      <div>
        <div className="title-container">
            <h3>Servers List</h3>
            <button type="button" className="btn btn-outline-primary" onClick={this.onNewButtonClicked}>New</button>
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}><thead><tr><th>Date</th>{ this.HeaderTable() }</tr></thead><tbody>{ this.BodyTable() }</tbody></table>
      </div>
    )
  }

}