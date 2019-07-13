import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../Home/HomeActions';
import './BoardStyles.scss';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Collapse,
    TextField,
    Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Utils from '../../Shared/Utilty';

class Board extends Component {
    constructor(props) {
        super(props);
        const INDEX = this.props.match.params.index;
        this.state = {
            index: INDEX,
            board: props.boards[INDEX],
            newList: false,
            newListName: "",
            createListDisabled: true,
        }
        this.updateBoards = this.updateBoards.bind(this);
        this.toggleNewList = this.toggleNewList.bind(this);
    }

    updateBoards() {
        const newBoards = this.props.boards;
        newBoards[this.state.index] = this.state.board;
        this.props.UpdateBoards(newBoards);
    }
    toggleNewList() {
        this.setState({
            newList: !this.state.newList
        })
    }

    render() {
        const { board, newList, newListName, createListDisabled } = this.state;
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
                <div className="listContainer">
                    {
                        board.lists.map((list, index) => {
                            return (
                                <div className="listCard" key={index}>
                                    <Card >
                                        <CardContent>
                                            <Typography>
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
                                        <CardContent>
                                            <Button>Add Card</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <Card className="addListCard">
                        <CardHeader
                            onClick={this.toggleNewList}
                            avatar={<AddIcon />}
                            title="Add New List"
                        />
                        <Collapse in={newList} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start">
                                    <TextField
                                        placeholder="Enter Board Title"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.updateNewCardName}
                                        value={newListName}
                                    />
                                    <Button
                                        disabled={createListDisabled}
                                        onClick={this.updateBoards}
                                        className={
                                            createListDisabled
                                                ? "btnCreate disabled"
                                                : "btnCreate"
                                        }>
                                        Create Board
                                        </Button>
                                </Grid>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
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