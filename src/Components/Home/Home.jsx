import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from './HomeActions';
import './HomeStyles.scss';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Collapse,
    TextField,
    Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { isNullOrEmpty } from '../../Shared/Utilty';
import NavBar from '../NavBar/NavBar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state= {
            open: false,
            newBoardsName: "",
            createDisabled: true
        }
        this.updateBoards = this.updateBoards.bind(this);
        this.openCreateCard = this.openCreateCard.bind(this);
        this.updateNewCardName = this.updateNewCardName.bind(this);
        this.viewBoard = this.viewBoard.bind(this);
    }

    updateBoards() {
        const newBoards = [
            ...this.props.boards,
            {
                boardName: this.state.newBoardsName,
                lists: [ ]
            }
        ];
        this.setState({
            newBoardsName: "",
            createDisabled: true
        });
        this.props.UpdateBoards(newBoards);
    }

    openCreateCard() {
        this.setState({
            open:  !this.state.open
        });
    }
    updateNewCardName(event) {
        this.setState({
            newBoardsName: event.target.value
        });
        const empty = isNullOrEmpty(event.target.value);
        this.setState({
            createDisabled: empty
        })
    }
    viewBoard(index) {
        this.props.history.push(`/board/${index}`);
    }

    render() {
        const { open, createDisabled, newBoardsName } = this.state;
        const { boards } = this.props;
        return (
            <Grid
                className="homeStyle"
                container
                direction="column"
                alignItems="center">
                <NavBar />
                <Grid
                    container
                    item
                    xs={10}
                    justify="flex-start">
                    <Typography className="title" variant="h5" component="h2">
                        Boards
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={10}
                    justify="flex-start"
                    className="boardContainer">
                    {
                        boards.map((board, index) => {
                            return (
                                <Grid
                                    key={index}
                                    container
                                    item
                                    xs={4}
                                    justify="flex-start"
                                    className="cardContainer">
                                    <Card
                                        onClick={() => this.viewBoard(index)}
                                        className="boardCard">
                                        <CardContent>
                                            <Typography variant="h5" component="h2" color="textSecondary" >
                                                {board.boardName}
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
                        xs={4}
                        justify="flex-start"
                        className="cardContainer">
                        <Card className="createCard">
                            <CardContent>
                                <Grid
                                    className="header"
                                    onClick={this.openCreateCard}
                                    container
                                    alignItems="center">
                                    <AddIcon fontSize="large" />
                                    <Typography variant="h5" component="h2">
                                        Create New Board
                                    </Typography>
                                </Grid>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Grid
                                        container
                                        direction="column"
                                        alignItems="flex-start">
                                        <TextField
                                            placeholder="Enter Board Title"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            onChange={ this.updateNewCardName }
                                            value={ newBoardsName }
                                        />
                                        <Button
                                            disabled={ createDisabled }
                                            onClick={this.updateBoards}
                                            className={
                                                createDisabled
                                                    ? "disabled"
                                                    : "btnCreate"
                                            }>
                                            Create Board
                                        </Button>
                                    </Grid>
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {
    boards: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    boards: state.projectBoardsState.boards
});
const mapActionsToProps = (dispatch) => ({
    UpdateBoards: bindActionCreators(HomeActions.UpdateBoards, dispatch) 
});
export default connect(mapStateToProps, mapActionsToProps)(Home);