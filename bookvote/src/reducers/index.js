import { combineReducers } from 'redux';
import { AUTHENTICATE } from '../actions';

const authenticateReducer = ( user = {username:null,token:null}, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return action.payload;
        default:
            return user;
    }
}

const rootReducer = combineReducers({
    user:authenticateReducer
    });

export default rootReducer;