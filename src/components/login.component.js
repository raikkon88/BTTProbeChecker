import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

export default class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user_nameOrEmail: '',
      user_password: '',
      loading: false,
      error: false
    }
    this.onChangeUserNameOrEmail = this.onChangeUserNameOrEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.useStyles = makeStyles(theme => ({
      heading: {
        margin: theme.spacing(2),
      }
    }))
  }


  onChangeUserNameOrEmail(e) {
    this.setState({
      user_nameOrEmail: e.target.value
    });
  }

  onChangeUserPassword(e) {
    this.setState({
      user_password: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    
    const user = {
      user_nameOrEmail: this.state.user_nameOrEmail,
      user_password: this.state.user_password
    };

    this.setState({ loading: true });

    axios.post('http://localhost:4000/auth/login/', user)    
      .then(res => {
        localStorage.setItem("token", res.data.token);
        window.location = "/server";
      })
      .catch(error => {
        this.setState({ error: error.request.response , loading: false })
      });
  }

  render() {
    const {loading, error } = this.state;
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h2" component="h2" className={ this.useStyles.heading }>
                Login
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={this.onSubmit}>
                <Grid container>
                  <TextField
                    style={{ minWidth: "300px"}}
                    id="email-id"
                    label="email"
                    type="email"
                    value={this.state.user_nameOrEmail}
                    onChange={this.onChangeUserNameOrEmail}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid container>
                  <TextField
                    style={{ minWidth: "300px"}}
                    id="password-id"
                    label="password"
                    type="password"
                    value={this.state.user_password}
                    onChange={this.onChangeUserPassword}
                    required
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                  { error &&
                    <div className={'alert alert-danger'}>{error}</div>
                  }
                <Grid item>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>Login</Button>
                </Grid>
              </form>
            </Grid>
        </Grid>
    )
  }
}
