import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
  
    console.log("props.LoginStore.title : ",props.LoginStore.title);
    console.log("Logged in ... ");
    if(props.LoginStore.email !== "" && props.LoginStore.password !== "") {
      localStorage.setItem('user',props.LoginStore.email)
      props.history.push('/dashboard');
      }
   }
  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    props.LoginStore.addPassword(e.target.value);
  }

  const emailChangeHandler = (e) => {
    console.log(e.target.value);
    props.LoginStore.addEmail(e.target.value);
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
        <ValidatorForm className={classes.form} onSubmit={loginSuccess}>
          <TextValidator

            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            onChange={emailChangeHandler}
          />
          <TextValidator
            
            margin="normal"
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth
            name="password"
            label="Password"
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
        </ValidatorForm>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default inject('LoginStore')(withRouter(SignIn));