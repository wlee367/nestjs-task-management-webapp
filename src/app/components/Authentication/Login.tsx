import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {
    Typography,
    Container,
    CssBaseline,
    Avatar,
    Box,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Layout } from '../Layout/Layout';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../redux/actions/users';
import { StoreState } from '../../redux/reducers';

export const useStyles = makeStyles((theme: Theme) => ({
    container: {},
    signup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0.5em'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function Copyright() {
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

export const Login = (props: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

    const user = typedUseSelector((state) => state.user);

    const error = user && user.authError;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    useEffect(() => {
        console.log(!error && user && user.authenticated)
        if(!error && user && user.authenticated) {
            setRedirect(true)
        }
    }, [user])

    const handleLogin = () => {
        const userData = {
            username,
            password,
        };
        dispatch(loginUser(userData, null));
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };

    const displayErrorMessage = () => {
        if(error && error.data.statusCode >= 400){
            return (
                <p style={{
                    color: 'red'
                }}>The given credentials were incorrect.</p>
            )
        }
    }

    if(redirect) {
        return <Redirect to={'/board'}/>
    }

    return (
        <Layout>
            <Container
                component="main"
                maxWidth="xs"
                className={classes.container}
            >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        autoComplete="off"
                    >
                        <Card>
                            <CardContent>
                                {
                                    displayErrorMessage()
                                }
                                <div>
                                    <TextField
                                        error={error !== null}
                                        fullWidth
                                        id="username"
                                        type="email"
                                        label="Username"
                                        placeholder="Username"
                                        margin="normal"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                    <TextField
                                        error={error !== null}
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        margin="normal"
                                        helperText={helperText}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        onKeyPress={(e) => handleKeyPress(e)}
                                    />
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => handleLogin()}
                                    className={classes.submit}
                                    color="primary"
                                    fullWidth
                                    disabled={isButtonDisabled}
                                >
                                    Login
                                </Button>
                            </CardActions>
                            <Grid container className={classes.signup}>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Card>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </Layout>
    );
};
