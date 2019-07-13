import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
    AppBar,
    Button,
    Toolbar,
    Typography
} from '@material-ui/core';

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={this.goHome}>
                        <Typography style={{ color: 'white' }} variant="h6">
                            Home (Boards)
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}
NavBar.propTypes = {
    history: PropTypes.object.isRequired,
}
export default withRouter(NavBar);