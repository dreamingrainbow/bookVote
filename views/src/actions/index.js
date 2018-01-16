export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_RESPONSE_DATA = 'SET_RESPONSE_DATA';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SUBCATEGORY = 'SET_SUBCATEGORY';

export const authenticate = (user = {username:null,token:null}) => {
    return {
        type : AUTHENTICATE,
        payload : user
    }
}

export const setFilter = (filter = 'SUBJECT') => {
    return {
        type : SET_FILTER,
        payload : filter
    }
} 

export const setSearchQuery = (search = 'math') => {
    return {
        type : SET_SEARCH_QUERY,
        payload : search
    }
} 

export const setResponseData = (responseData = {RESPONSE:['Error','No Response']}) => {
    return {
        type : SET_RESPONSE_DATA,
        payload : responseData
    }
}


export const setCategory = (category = 'All') => {
    return {
        type : SET_CATEGORY,
        payload : category
    }
}
export const setSubcategory = (subcategory = null) => {
    return {
        type : SET_SUBCATEGORY,
        payload : subcategory
    }
}