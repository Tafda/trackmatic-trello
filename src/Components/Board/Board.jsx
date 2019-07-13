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
import { isNullOrEmpty } from '../../Shared/Utilty';
import NavBar from '../NavBar/NavBar';

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
            newCardName: "",
            createCardDisabled: true,
            newCardListIndex: null,
            creatingCard: false
        }
        this.createList = this.createList.bind(this);
        this.toggleNewList = this.toggleNewList.bind(this);
        this.updateNewListName = this.updateNewListName.bind(this);
        this.updateBoards = this.updateBoards.bind(this);
        this.updateNewCardName = this.updateNewCardName.bind(this);
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    createList() {
        const newBoard = this.state.board;
        newBoard.lists = [
            ...newBoard.lists,
            {
                name: this.state.newListName,
                cards: []
            }
        ];
        this.setState({
            board: newBoard,
            newListName: "",
            createListDisabled: true,
        })
        this.updateBoards();
    }
    addCard() {
        const listIndex = this.state.newCardListIndex;
        const list = this.state.board.lists[listIndex];
        var newCardsList = list.cards;
        newCardsList = [
            ...newCardsList,
            { name: this.state.newCardName }
        ];
        var lists = this.state.board.lists;
        lists[listIndex].cards = newCardsList;
        this.setState({
            board: {
                ...this.state.board,
                lists
            },
        });
        this.updateBoards();
    }
    toggleAddCard(listIndex) {
        this.setState({
            newCardListIndex: listIndex,
            creatingCard: !this.state.creatingCard
        })
    }
    updateNewCardName(event) {
        this.setState({
            newCardName: event.target.value
        });
        const empty = isNullOrEmpty(event.target.value);
        this.setState({
            createCardDisabled: empty
        });
    }
    updateBoards() {
        const newBoards = this.props.boards;
        this.setState({
                newList: false,
                newListName: "",
                createListDisabled: true,
                newCardName: "",
                createCardDisabled: true,
                newCardListIndex: null,
                creatingCard: false
        });
        newBoards[this.state.index] = this.state.board;
        this.props.UpdateBoards(newBoards);
    }
    toggleNewList() {
        this.setState({
            newList: !this.state.newList
        })
    }
    updateNewListName(event) {
        this.setState({
            newListName: event.target.value
        });
        const empty = isNullOrEmpty(event.target.value);
        this.setState({
            createListDisabled: empty
        });
    }

    render() {
        const {
            board,
            newList,
            newListName,
            createListDisabled,
            newCardName,
            createCardDisabled,
            newCardListIndex,
            creatingCard
        } = this.state;
        return (
            <Grid
                className="boardStyle"
                container
                direction="column"
                alignItems="center">
                <NavBar />
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
                                    <Card className="transparent">
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
                                                            className="cardItem"
                                                            key={index}>
                                                            <CardContent>
                                                                <Typography color="textSecondary" >
                                                                    {card.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                })
                                            }
                                        </CardContent>
                                        
                                            {
                                                (creatingCard && (index === newCardListIndex))
                                                ?
                                                <CardContent>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        alignItems="flex-start">
                                                        <TextField
                                                            placeholder="Enter Card Title"
                                                            fullWidth
                                                            variant="outlined"
                                                            onChange={this.updateNewCardName}
                                                            value={newCardName}
                                                        />
                                                        <Button
                                                            disabled={createCardDisabled}
                                                            onClick={this.addCard}
                                                            className={
                                                                createCardDisabled
                                                                    ? "disabled"
                                                                    : "btnCreate"
                                                            }>
                                                            Add Card
                                                        </Button>
                                                    </Grid>
                                                </CardContent>
                                                :
                                                <CardContent
                                                    className="listFooter pointer">
                                                    <Grid
                                                        onClick={() => this.toggleAddCard(index)}
                                                        container
                                                        alignItems="center">
                                                        <AddIcon fontSize="small" /> Add Card
                                                    </Grid>
                                                </CardContent>
                                            }
                                            
                                       
                                        
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <Card className="addListCard">
                        <CardHeader
                            className="pointer newListHeader"
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
                                        placeholder="Enter List Title"
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.updateNewListName}
                                        value={newListName}
                                    />
                                    <Button
                                        disabled={createListDisabled}
                                        onClick={this.createList}
                                        className={
                                            createListDisabled
                                                ? "disabled"
                                                : "btnCreate"
                                        }>
                                        Create List
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