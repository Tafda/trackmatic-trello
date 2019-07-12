import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class Home extends Component {


    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center">
                <Grid
                    container
                    item
                    xs="10"
                    justify="flex-start">
                    Hello
                </Grid>
                <Grid
                    container
                    item
                    xs="10"
                    justify="flex-start">
                    
                </Grid>
            </Grid>
        );
    }
}
export default Home;