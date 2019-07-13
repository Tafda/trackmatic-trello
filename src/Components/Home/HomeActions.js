import * as Types from './HomeActionTypes';
export const UpdateBoards = (updatedBoards) => {
    return function (dispatch) {
        dispatch({
            type: Types.CREATE_BOARD,
            payload: updatedBoards
        });
    };
};