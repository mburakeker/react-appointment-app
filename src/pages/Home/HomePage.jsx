import { Paper, Typography } from "@material-ui/core";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        height:'40vh'
    },
    welcomeText: {
        fontSize: theme.spacing(5),
        color: '#193365',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    subHeaderText: {
        fontSize: theme.spacing(3),
        color: '#193365',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    }
}));
const HomePage = () => {
    const classes = useStyles();
    return(<Paper className={classes.paper}>
        <Typography className={classes.welcomeText}>Welcome to home page!</Typography>
        <Typography className={classes.subHeaderText}>This application is running in {process.env.NODE_ENV} mode.</Typography>
        <Typography className={classes.subHeaderText}>{process.env.REACT_APP_CUSTOM_ENVIRONMENT_VARIABLE}</Typography>
    </Paper>)
}
export default HomePage;