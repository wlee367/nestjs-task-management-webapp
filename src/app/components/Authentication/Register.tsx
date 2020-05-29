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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Layout } from '../Layout/Layout';

export const Register = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleLogin = () => {
        if (username === 'abc@email.com' && password === 'password') {
            setError(false);
            setHelperText('Login Successfully');
        } else {
            setError(true);
            setHelperText('Incorrect username or password');
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };

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
                                <div>
                                    <TextField
                                        error={error}
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
                                        error={error}
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
