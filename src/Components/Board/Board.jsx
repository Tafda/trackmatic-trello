import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../Home/HomeActions';
import './BoardStyles.scss';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Collapse,
    TextField,
    Button
} from '@material-ui/core';
import * as Utils from '../../Shared/Utilty';

class Board extends Component {
    constructor(props) {
        super(props);
        const INDEX = this.props.match.params.index;
        this.state = {
            index: INDEX,
            board: props.boards[INDEX]
        }
        this.updateBoards = this.updateBoards.bind(this);
    }

    updateBoards() {
        const newBoards = this.props.boards;
        newBoards[this.state.index] = this.state.board;
        this.props.UpdateBoards(newBoards);
    }

    render() {
        const { board } = this.state;
        return (
            <Grid
                className="boardStyle"
                container
                direction="column"
                alignItems="center">
                <Grid
                    container
                    item
                    xs={12}
                    justify="flex-start">
                    <Typography className="title" variant="h5" component="h2">
                        {board.boardName}
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    justify="flex-start">
                    {
                        board.lists.map((list, index) => {
                            return (
                                <Card
                                    key={index}
                                    className="listCard">
                                    <CardContent>
                                        <Typography variant="h5" component="h3" color="textSecondary" >
                                            {list.name}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        {
                                            list.cards.map((card, index) => {
                                                return (
                                                    <Card
                                                        key={index}>
                                                        <CardContent>
                                                            <Typography variant="h5" color="textSecondary" >
                                                                {card.name}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })
                                        }
                                    </CardContent>
                                </Card>
                            );
                        })
                    }

                </Grid>
            </Grid>
        );
    }
}
Board.propTypes = {
    boards: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    boards: state.projectBoardsState.boards
});
const mapActionsToProps = (dispatch) => ({
    UpdateBoards: bindActionCreators(HomeActions.UpdateBoards, dispatch)
});
export default connect(mapStateToProps, mapActionsToProps)(Board);