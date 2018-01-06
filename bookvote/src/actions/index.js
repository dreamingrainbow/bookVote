export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (user = {username:null,token:null}) => {
    return {
        type : AUTHENTICATE,
        payload: user
    }
}