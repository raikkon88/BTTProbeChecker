import React, { Component } from 'react';
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';
import Login from '../components/login.component'

/**
 * Pàgina inicial, la idea és mostrar tots els miniservers que tinguin adreces públiques.
 * - Llistar les adreces públiques (enllaços)
 * - Mostrar informació sobre aquest servei de l'empresa.
 */
export default class LoginScreen extends Component {

  render() {
    return (
      <Grid container xs={12}>
        <Header></Header>
        <Login></Login>
        <Footer></Footer>
      </Grid>
    )
  }
}