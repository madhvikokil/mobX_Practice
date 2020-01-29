// import React, { Component } from 'react';
// import { observer, inject }  from 'mobx-react';
// import { withRouter } from 'react-router-dom';

// @inject('LoginStore')
// @observer
// class App extends Component {
 
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const email = this.email.value;
//     this.props.LoginStore.addEmail(email);
//     const password = this.password.value;
//     this.props.LoginStore.addPassword(password);
//     this.password.value = "";
//     this.email.value = ""
//     this.props.history.push('./dashboard');
//   }
//   render() {
//     const { LoginStore } = this.props;
//     return (
//       <div>
//     <h2> Get Details : {LoginStore.details}</h2>
//       <form onSubmit={e => this.handleSubmit(e)}>
//         <input type="text" placeholder="Enter Email" ref={input =>this.email = input} /><br />
//         <input type="text" placeholder="Enter Password" ref={input =>this.password = input} /><br />
//         <button>Submit</button>
//       </form>
        
//       </div>
//     );
//   }
// }
// export default withRouter(App);
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();

  const loginSuccess =() => {
    if(props.LoginStore.email === "" || props.LoginStore.password === "") {
      alert("Fill the details");
    } else {
      console.log("props.LoginStore.title : ",props.LoginStore.title);
    console.log("Logged in ... ");
    props.history.push('/dashboard');
    }
    
  }
  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    props.LoginStore.addEmail(e.target.value);
  }

  const emailChangeHandler = (e) => {
    console.log(e.target.value);
    props.LoginStore.addPassword(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginSuccess}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            TextField
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChangeHandler}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginSuccess}
          >
            Sign In
          </Button>
          <Grid container>
         </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default inject('LoginStore')(withRouter(SignIn));