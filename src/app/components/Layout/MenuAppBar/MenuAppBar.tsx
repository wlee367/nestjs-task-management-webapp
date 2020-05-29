import React from 'react';
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            position: 'sticky',
            top: '0',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        shiftedTitle: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        },
        toolBar: {
            minHeight: 48,
        },
        appBarButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    })
);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const AppBarRight = (auth: boolean) => {
        if (auth) {
            return (
                <>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <StyledMenuItem>
                            <ListItemIcon>
                                <ShareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Share your board" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </StyledMenuItem>
                    </StyledMenu>
                </>
            );
        } else {
            return (
                <div className={classes.appBarButtonsContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/register"
                    >
                        Register
                    </Button>
                    <Button
                        style={{ marginLeft: '0.5em' }}
                        variant="contained"
                        color="primary"
                        href="/login"
                    >
                        Login
                    </Button>
                </div>
            );
        }
    };

    const shouldDisplayArrowBack = () => {
        const notShown = ['/', '/login', '/register'];
        return !notShown.includes(location.pathname);
    };

    const shouldDisplayArrow = shouldDisplayArrowBack();

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    {shouldDisplayArrow && (
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {
                                history.push('/');
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    )}
                    <Typography
                        className={
                            shouldDisplayArrow
                                ? classes.title
                                : classes.shiftedTitle
                        }
                    >
                        <Link href="/" color="inherit" underline="none">
                            App Name
                        </Link>
                    </Typography>
                    {AppBarRight(auth)}
                </Toolbar>
            </AppBar>
        </div>
    );
}
