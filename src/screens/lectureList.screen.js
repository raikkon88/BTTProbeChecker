import React, { Component } from 'react';
import axios from 'axios';
import LectureList from '../components/lecture-list.component'
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import Grid from '@material-ui/core/Grid';

export default class LectureListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      probe_category: "",
      probe_name: "",
      probe_room: "",
      probe_server: "",
      probe_type: "",
      probe_uuid: "",
      probe_lectures: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4000/server/probe/' + this.props.match.params.id,  { 
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
          console.log(response.data);
          this.setState({ 
            probe_category: response.data.probe_category,
            probe_name: response.data.probe_name,
            probe_room: response.data.probe_room,
            probe_server: response.data.probe_server,
            probe_type: response.data.probe_type,
            probe_uuid: response.data.probe_uuid,
            probe_lectures : response.data.probe_lectures
          });
        })
        .catch(error => {
            console.log(error);
        })
  }

  render(){
    return (
      <Grid container>
        <Header></Header>
        <LectureList lectures={this.state.probe_lectures}></LectureList>
        <Footer></Footer>
      </Grid>
    )
  }
}
