import React, { Component } from 'react';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import Grid from '@material-ui/core/Grid';
import CreateServer from '../components/create-server.component';

export default class CreateServerScreen extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <CreateServer></CreateServer>
        <Footer></Footer>
      </Grid>
    )
  }
}