import * as Types from './HomeActionTypes';
export const UpdateBoards = (updatedBoards) => {
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_BOARD,
            payload: updatedBoards
        });
    };
};