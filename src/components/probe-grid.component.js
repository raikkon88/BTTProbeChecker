import React, { Component } from 'react';
import ProbeRow from './probe-row.component';
import axios from 'axios';

export default class ProbeGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lectures: [],
        probe_names: []
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
            lectures: response.data.lectures,
            probe_names: response.data.probe_names
          });
        })
        .catch(function (error){
            console.log(error);
        })
  }

  BodyTable(){
    return this.state.lectures.map((element, id, arr) => {
      console.log(element)
      return <ProbeRow row={element} key={id}></ProbeRow>
    })
  }

  render() {
    return (
      <div>
        <div className="title-container">
            <h3>Servers List</h3>
            <button type="button" className="btn btn-outline-primary" onClick={this.onNewButtonClicked}>New</button>
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}><thead><tr><th>Date</th>
        {
          this.state.probe_names.map((element, id, arr) => {
            return <th key={id}>{element}</th>
          })
        }
        </tr></thead><tbody>{ this.BodyTable() }</tbody></table>
      </div>
    )
  }

}


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