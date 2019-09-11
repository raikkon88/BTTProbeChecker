import React, { Component } from 'react';
export default class ProbeRrid extends Component {
  
  render() {
    return (
      <tr> 
        <td>{ this.props.row._id }</td>
          {
            this.props.row.lectures.map((element, id, arr) => {
              return <td key={id}>{element.lecture_value}</td>
            })
          }
      </tr>
    )
  }
          

}
