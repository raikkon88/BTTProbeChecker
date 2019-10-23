import React, { Component } from 'react';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import Grid from '@material-ui/core/Grid';
import CreateProbe from '../components/create-probe.component';

export default class CreateProbeScreen extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <CreateProbe serverId={this.props.match.params.id}></CreateProbe>
        <Footer></Footer>
      </Grid>
    )
  }
}