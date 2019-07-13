import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';

const RootReducer = combineReducers({
    projectBoardsState: HomeReducer
});

export default RootReducer;