import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';

import VCERNTypography from './elements/VCERNTypography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { connect } from 'react-redux';

import icons from './icons';

import AC from '../redux/actions/actionCreater';
import { useHistory } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: { display: 'flex' },
    toolbar: { paddingRight: 24 },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        background: 'white',
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: { marginRight: 36 },
    menuButtonHidden: { display: 'none' },
    title: { flexGrow: 1 },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: { width: theme.spacing(9) },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: { flexGrow: 1, height: '100vh', overflow: 'auto' },
    container: { paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) },

    boldText: { fontWeight: 'bold' },
    displayPicture: { height: 100, width: 100, marginBottom: 20 },
    infoBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 },
}));

function Header({ children, logout }) {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const userList = [
        { title: 'Dashboard', href: 'dashboard', icon: icons.dashboard },
        { title: 'Messages', href: 'messages', icon: icons.messages },
        { title: 'Tickets', href: 'tickets', icon: icons.ticket },
        { title: 'Invite', href: 'dashboard', icon: icons.invite },
        { title: 'Profile', href: 'dashboard', icon: icons.profile },
        { title: 'Payments', href: 'dashboard', icon: icons.payment },
        { title: 'Settings', href: 'dashboard', icon: icons.settings },
    ];

    const handleLogout = () => {
        logout();
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" aria-label="open drawer" onClick={() => setOpen(true)} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        {icons.menu}
                    </IconButton>
                    <Typography component="h1" variant="h6" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            {icons.notification}
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }} open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setOpen(false)}>{icons.right}</IconButton>
                </div>
                {open && (
                    <div className={classes.infoBox}>
                        <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" className={classes.displayPicture} alt="Display Pic" />
                        <VCERNTypography variant="body2" className={classes.boldText} value="Cameroonian Association" />
                    </div>
                )}
                <Divider />
                <List>
                    {userList.map((el, idx) => (
                        <ListItem key={idx} component="a" href={el.href} button>
                            <ListItemIcon>{el.icon}</ListItemIcon>
                            <ListItemText primary={el.title} />
                        </ListItem>
                    ))}
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>{icons.logout}</ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
        </div>
    );
}

export default connect(state => state, { logout: AC.logout })(Header);
