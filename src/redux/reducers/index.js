import {combineReducers} from 'redux';
import { UserReducer,selectedUserReducer } from './UserReducer';

const reducer = combineReducers({
    allUsers:UserReducer,
    user:selectedUserReducer,
})
export default reducer