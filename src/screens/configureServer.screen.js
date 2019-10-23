import React, { Component } from 'react';
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';
import ConfigureServer from '../components/configure-server.component'

export default class ConfigureServerScreen extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <ConfigureServer serverId={this.props.match.params.id}></ConfigureServer>
        <Footer></Footer>
      </Grid>
    )
  }
}