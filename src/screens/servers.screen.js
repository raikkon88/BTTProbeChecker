import React, {Component} from 'react'
import ServerList from '../components/server-list.component'
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';

export default class Servers extends Component {

  render(){
    return(
      <Grid container>
        <Grid item xs={12}>
          <Header></Header>
          <ServerList></ServerList>
          <Footer></Footer>
        </Grid>
      </Grid> 
    )
  }
}