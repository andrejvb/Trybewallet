import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// const reducers = { user, wallet };
const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
