import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {  useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../store/reducers/userSlice';
import { Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { Login } from '../../api/user';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [errorMessage] = useState(null);
  const [usernameTextfieldAttribute, setUsernameTextfieldAttribute] = useState({});
  const [passwordTextfieldAttribute, setPasswordTextfieldAttribute] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!password){
      setPasswordTextfieldAttribute({error:true,helperText:'Password can\'t be empty!'})
      return;
    }
    if (!username) {
      setUsernameTextfieldAttribute({ error: true, helperText: 'Username can\'t be empty!' })
      return;
    }
    Login({username:username,password:password}).then((response)=>{
      if(response.data != null && response.data.token!= null){
        dispatch(setLoggedIn(true));
      }
    })
    setAttemptedLogin(true);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameTextfieldAttribute({});
  }
  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTextfieldAttribute({});
  }

  return (
    <>
      {userStore && userStore.isLoggedIn && (<Redirect to="/" />)}
      <main className={classes.main}>
        <CssBaseline />
        <Paper elevation={5} className={classes.paper}>
          <form onSubmit={onSubmit} className={classes.form}>
            <FormControl required fullWidth >
              <label className={classes.label}>Username</label>
              <TextField helperText=" " {...usernameTextfieldAttribute} value={username} variant="outlined" label="Username" onChange={onUsernameChange} name="username" autoComplete="username" autoFocus />
            </FormControl>
            <FormControl required fullWidth>
              <label className={classes.label}>Password</label>
              <TextField helperText=" " {...passwordTextfieldAttribute} InputProps={{
                endAdornment: (<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>)
              }}
                value={password}
                variant="outlined"
                label="Password"
                onChange={onPasswordChange}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password" />
            </FormControl>
            {attemptedLogin &&
              (!userStore.isLoggedIn &&
              userStore.accessDenied) || userStore.error &&
              <Alert severity="error">{userStore.errorMessage ?? "Login failed! Username or password is wrong!"}</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
                    </Button>
                    
          <Typography className={classes.label}>Username: john</Typography>
          <Typography className={classes.label}>Password: doe</Typography>
          </form>
        </Paper>
      </main>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(75),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(22),
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    paddingBottom: theme.spacing(15)
  },
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: '#03254C',
  },
  label: {
    fontSize: theme.spacing(2),
    color: '#193365',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    paddingRight: theme.spacing(17),
    paddingLeft: theme.spacing(17),
  }
}));

export default LoginPage;