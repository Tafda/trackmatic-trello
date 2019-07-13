import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as HomeActions from './HomeActions';
import './HomeStyles.scss';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Modal
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.UpdateBoards = this.UpdateBoards.bind(this);
    }

    UpdateBoards(newBoard) {
        const BOARDS = this.props.boards;
        const newBaords = [...BOARDS, newBoard];
        this.props.UpdateBoards(newBaords);
    }

    render() {
        const arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        return (
            <Grid
                className="homeStyle"
                container
                direction="column"
                alignItems="center">
                <Grid
                    container
                    item
                    xs="10"
                    justify="flex-start">
                    <Typography className="title" variant="h5" component="h2">
                        Boards
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs="10"
                    justify="flex-start">
                    {
                        arr.map((candidate, index) => {
                            return (
                                <Grid
                                    container
                                    item
                                    xs="4"
                                    justify="flex-start"
                                    className="cardContainer">
                                    <Card className="boardCard">
                                        <CardContent>
                                            <Typography className={"classes.title"} color="textSecondary" gutterBottom>
                                                Word of the Day
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                benevolent
                                            </Typography>
                                            <Typography className={"classes.pos"} color="textSecondary">
                                                adjective
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                well meaning and kindly.
                                                <br />
                                                {'"a benevolent smile"'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                    <Grid
                        container
                        item
                        xs="4"
                        justify="flex-start"
                        className="cardContainer">
                        <Card className="boardCard">
                            <CardContent>
                                <Grid
                                    container
                                    alignItems="center">
                                    <AddIcon fontSize="large" />
                                    <Typography variant="h5" component="h2">
                                        Create New Board
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {
    boards: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    boards: state.projectBoardsState.boards
});
const mapActionsToProps = (dispatch) => ({
    UpdateBoards: bindActionCreators(HomeActions.UpdateBoards) 
});
export default connect(mapStateToProps, mapActionsToProps)(Home);