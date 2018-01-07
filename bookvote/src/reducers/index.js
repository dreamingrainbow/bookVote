import { combineReducers } from 'redux';
import { AUTHENTICATE,
    SET_FILTER,
    SET_SEARCH_QUERY,
    SET_RESPONSE_DATA,
    SET_CATEGORY,
    SET_SUBCATEGORY
} from '../actions';

const authenticateReducer = ( user = {username:null,token:null}, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return action.payload;
        default:
            return user;
    }
}

const filterReducer = ( filter = 'SUBJECT', action) => {
    switch(action.type){
        case SET_FILTER:
            return action.payload;
        default:
            return filter;
    }
}

const searchReducer = ( search = 'math', action) => {
    switch(action.type){
        case SET_SEARCH_QUERY:
            return action.payload;
        default:
            return search;
    }
}

const responseReducer = ( response = {RESPONSE:['Error','No Response']}, action) => {
    switch(action.type){
        case SET_RESPONSE_DATA:
            return action.payload;
        default:
            return response;
    }
}
const categoryReducer = ( category = 'All', action) => {
    switch(action.type){
        case SET_CATEGORY:
            return action.payload;
        default:
            return category;
    }
}
const subcategoryReducer = ( subcategory = null, action) => {
    switch(action.type){
        case SET_SUBCATEGORY:
            return action.payload;
        default:
            return subcategory;
    }
}

const rootReducer = combineReducers({
    user:authenticateReducer,
    filter:filterReducer,
    search:searchReducer,
    response: responseReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer
    });

export default rootReducer;