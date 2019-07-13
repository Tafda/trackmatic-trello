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
    }

    updateBoards() {
        const newBaords = [
            ...this.props.boards,
            {
                boardName: this.state.newBoardsName,
                lists: [
                    {
                        listName: "",
                        cards: [
                            {
                                cardName: ""
                            }
                        ]
                    }
                ]
            }
        ];
        this.setState({
            newBoardsName: "",
            createDisabled: true
        });
        this.props.UpdateBoards(newBaords);
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
        if (event.target.value === "") {
            this.setState({
                createDisabled: true
            });
        } else {
            this.setState({
                createDisabled: false
            });
        }
    }

    render() {
        const { open, createDisabled, newBoardsName } = this.state;
        const { } = this.props;
        return (
            <Grid
                className="homeStyle"
                container
                direction="column"
                alignItems="center">
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
                    justify="flex-start">
                    {
                        this.props.boards.map((board, index) => {
                            return (
                                <Grid
                                    key={index}
                                    container
                                    item
                                    xs={4}
                                    justify="flex-start"
                                    className="cardContainer">
                                    <Card className="boardCard">
                                        <CardContent>
                                            <Typography className={"classes.title"} color="textSecondary" gutterBottom>
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
                                                    ? "btnCreate disabled"
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
    boards: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
    boards: state.projectBoardsState.boards
});
const mapActionsToProps = (dispatch) => ({
    UpdateBoards: bindActionCreators(HomeActions.UpdateBoards, dispatch) 
});
export default connect(mapStateToProps, mapActionsToProps)(Home);