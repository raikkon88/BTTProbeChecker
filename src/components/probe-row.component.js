import React, { Component } from 'react';
export default class ProbeRrid extends Component {
  
  printRow(){
    
    return this.props.values.map((element, id, arr) => {
      return <td key={id + element._id}>{element.lecture_value}</td>;
    })
      

    /*this.props.values.map((element, id, arr) => {
      
      console.log("posicio de l'element = " + element.position)

     
      
      console.log("index de l'element = " + i)
      return <td key={id}>{element.lecture_value}</td>;
        
        /*console.log("columna que estem actualment : " + i)
        if(){
          return (<td key={id}>{element.lecture_value}</td>)
        }
        else if(i < element.position){
          return <td></td>
        }
        /*
        else {
          return <td></td>
        }
      
    })*/
  }


  render() {
    return (
      <tr> 
        <td>{ this.props.id }</td>
          {
            this.printRow()
          }
      </tr>
    )
  }
          

}
