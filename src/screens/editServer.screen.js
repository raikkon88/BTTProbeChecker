import React, { Component } from 'react';
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';
import EditServer from '../components/edit-server.component'

export default class EditServerScreen extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <EditServer serverId={this.props.match.params.id}></EditServer>
        <Footer></Footer>
      </Grid>
    )
  }
}