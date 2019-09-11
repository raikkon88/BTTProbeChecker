import React, { Component } from 'react';
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Login from '../components/login.component'

export default class LoginScreen extends Component {

  render() {
    const {loading, error } = this.state;
    return (
      <Grid container xs={12}>
        <Header></Header>      
        <Login></Login>
        <Footer></Footer>
      </Grid>
    )
  }
}
