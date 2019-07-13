import * as Types from './HomeActionTypes';
import InitialState from '../../Shared/State/InitialState';

const HomeReducer = (state = InitialState.projectBoardsState, action) => {
    switch (action.type) {
        case Types.UPDATE_BOARD:
            return {
                boards: action.payload
            };
        default: {
            return state;
        }
    }
};

export default HomeReducer;