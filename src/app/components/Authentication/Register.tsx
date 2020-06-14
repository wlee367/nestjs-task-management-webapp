import React, { useState, useEffect } from 'react';
import { useStyles, Copyright } from './Login';
import TextField from '@material-ui/core/TextField';
import {
    Typography,
    Container,
    CssBaseline,
    Avatar,
    Box,
} from '@material-ui/core';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Layout } from '../Layout/Layout';
import { signUpUser } from '../../redux/actions/users';
import { useDispatch } from 'react-redux'
import { StoreState } from '../../redux/reducers';

export const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');

    const user = typedUseSelector((state) => state.user);

    const error = user && user.authError;

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleRegister = () => {
        const userData = {
            username,
            password,
        };

        dispatch(signUpUser(userData))
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleRegister();
        }
    };

    const displayErrorMessage = () => {
        if(error && error.data.statusCode === 400){
            return (
                <p style={{
                    color: 'red'
                }}>
                 Please choose a stronger password. Passwords must be at least 8 characters long, and contain at least one capital letter and at least one special character.
                </p>
            )
        }
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
                        Register
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
                                    onClick={() => handleRegister()}
                                    className={classes.submit}
                                    color="primary"
                                    fullWidth
                                    disabled={isButtonDisabled}
                                >
                                    Register
                                </Button>
                            </CardActions>
                            <Grid container className={classes.signup}>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {'Already have an account? Log In'}
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
