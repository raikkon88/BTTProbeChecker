import React, {Component} from 'react'
import ProbeList from '../components/probe-list.component'
import Header from '../components/header.component'
import Footer from '../components/footer.component'
import Grid from '@material-ui/core/Grid';

export default class Server extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Grid container>
        <Grid item xs={12}>
          <Header></Header>
          <ProbeList probeId={this.props.match.params.id}></ProbeList>
          <Footer></Footer>
        </Grid>
      </Grid> 
    )
  }
}