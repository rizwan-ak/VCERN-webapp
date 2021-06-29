import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';

import VCERNTypography from './elements/VCERNTypography';
import VCERNAvatar from './elements/VCERNAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { connect } from 'react-redux';

import icons from './icons';

import AC from '../redux/actions/actionCreater';
import { useHistory, useLocation } from 'react-router';
import { Button, Menu, MenuItem } from '@material-ui/core';

import { handleNotification, join, onJoin, onUpdate, onNewNotification, disconnectSocket } from '../common/socketNotifications';
import constants from './constants';
import { timeDiffFromNow } from './helper';

import { MembersMenu, vcernMenu, organizationsMenu } from './data';
import PaymentModal from './PaymentModal';

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
    displayPicture: { height: 100, width: 100, marginBottom: 20, borderRadius: 50 },
    infoBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 },

    divider: { margin: '15px 0' },
    notificationsTitle: { fontWeight: 'bold', margin: '10px 15px' },
    notificationsPicture: { height: 50, width: 50, marginRight: 10, borderRadius: 50 },
    clipedText: { whiteSpace: 'initial', width: 250, fontWeight: 'bold' },
    notificationTextBox: { display: 'flex', flexDirection: 'column' },
}));

function Header({ children, logout, currentUser, type }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notification, setNotification] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const { image, first_name, last_name, _id, organization } = currentUser;

    useEffect(() => {
        join(type === constants.USER_TYPE_VCERN ? 'vcern_admin' : type, _id, organization);
        onJoin(setNotifications);
        onUpdate();
        onNewNotification(setNotifications);

        return () => disconnectSocket();
    }, []);

    useEffect(() => {
        setHideHeader(location.pathname === '/select-pool');
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        history.push('/');
    };

    const handleNotifiactionsClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleConfirmPayment = () => {
        console.log(notification);
        setShowPaymentModal(false);
    };

    const handleMenuOption = currentNotification => {
        setNotification(currentNotification);
        const { type } = currentNotification;
        setAnchorEl(null);
        type === 'pool_invitation' && setShowPaymentModal(true);

        // handle announcment type
        // handleNotification();
    };

    const renderMenu = type === constants.USER_TYPE_MEMBER ? MembersMenu : type === constants.USER_TYPE_ORG ? organizationsMenu : vcernMenu;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div style={{ display: hideHeader ? 'none' : 'flex' }}>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton edge="start" aria-label="open drawer" onClick={() => setOpen(true)} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                            {icons.menu}
                        </IconButton>
                        <VCERNTypography variant="h6" noWrap value="Dashboard" className={classes.title} />
                        {!(type === constants.USER_TYPE_VCERN) && (
                            <Button color="primary" variant="outlined" onClick={() => history.push('/select-pool')}>
                                Change Pool
                            </Button>
                        )}
                        <IconButton color="inherit" onClick={handleNotifiactionsClick}>
                            <Badge badgeContent={4} color="secondary">
                                {icons.notification}
                            </Badge>
                        </IconButton>
                        <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={() => setAnchorEl(null)}>
                            {!!notifications.length ? (
                                <>
                                    <VCERNTypography variant="body1" noWrap value="New" className={classes.notificationsTitle} />
                                    {notifications.map((el, idx) => (
                                        <MenuItem onClick={() => handleMenuOption(el)} key={idx}>
                                            <VCERNAvatar src={el?.image} className={classes.notificationsPicture}>
                                                ?
                                            </VCERNAvatar>
                                            <div className={classes.notificationTextBox}>
                                                <VCERNTypography className={classes.clipedText} variant="body2" value={`${el?.title}! ${el?.description}`} />
                                                <VCERNTypography variant="caption" noWrap value={timeDiffFromNow(el.date)} customColor="#6F7F9F" />
                                            </div>
                                        </MenuItem>
                                    ))}
                                    {/* <Divider variant="middle" className={classes.divider} /> */}
                                </>
                            ) : (
                                <VCERNTypography variant="body1" noWrap value="Nothing To Show" className={classes.notificationsTitle} />
                            )}
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }} open={open}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => setOpen(false)}>{icons.right}</IconButton>
                    </div>
                    {open && (
                        <div className={classes.infoBox}>
                            <VCERNAvatar src={image} className={classes.displayPicture} alt={`${first_name} ${last_name}`} />
                            <VCERNTypography variant="body2" className={classes.boldText} value="Cameroonian Association" />
                        </div>
                    )}
                    <Divider variant="middle" />
                    <List>
                        {renderMenu.map((el, idx) => (
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
            </div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
            <PaymentModal onClose={() => setShowPaymentModal(false)} open={showPaymentModal} onConfirm={handleConfirmPayment} title="Join" />
        </div>
    );
}

export default connect(state => state, { logout: AC.logout })(Header);
