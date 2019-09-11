import React, { Component } from 'react';
import axios from 'axios';

export default class LectureList extends Component {

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  
  render(){
    return(<ul>
      { 
        this.props.lectures.map((element, index, arr) => {
          let date = this.parseISOString(element.lecture_date)
          return <li key={index}><span>{element._id}</span>   <span>{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()}</span>   <span>{element.lecture_value}</span></li>
        })
      }
    </ul>)
  }
}