import React, { Component } from 'react';
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';
import ProbeGrid from '../components/probe-grid.component'

export default class GridScreen extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <ProbeGrid serverId={this.props.match.params.id}></ProbeGrid>
        <Footer></Footer>
      </Grid>
    )
  }
}