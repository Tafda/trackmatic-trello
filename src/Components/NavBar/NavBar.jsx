import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button, 
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={"classes.menuButton"} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={"classes.title"}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;