import React, { Component } from 'react';
import ProbeRow from './probe-row.component';
import axios from 'axios';

export default class ProbeGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      probes: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4000/server/grid/'+this.props.serverId,  { 
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
          console.log(response.data);
          this.setState({ 
            probes : response.data
          });
        })
        .catch(function (error){
            console.log(error);
        })
  }
  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  BodyTable(){

    let lectures = []
    this.state.probes.map((probeElement, idElement, arr) => {
      probeElement.probe_lectures.map((lectureElement, id, arr) => {
        // Li afegeixo la columna de la taula on ha d'anar el valor.
        lectureElement.position = idElement
        let date = this.parseISOString(lectureElement.lecture_date);
        let dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        if(lectures[dateString]){
          lectures[dateString].push(lectureElement)
        }
        else{
          lectures[dateString] = [] 
          lectures[dateString].push(lectureElement)
        }        
      })
    })

    return Object.entries(lectures).map((element, id, arra) => {
      if(this.state.probes.length === element[1].length){
        return <ProbeRow columns={this.state.probes.length} key={id} id={element[0]} values={element[1]} />
      }      
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
          this.state.probes.map((element, id, arr) => {
            return <th key={id}>{element.probe_name}</th>
          })
        }
        </tr></thead><tbody>{  this.BodyTable()  }</tbody></table>
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