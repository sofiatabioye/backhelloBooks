import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';
import { SIGN_UP } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};


export default (state = { user:[], loading: false, errors: [] }, action = {}) => {
    switch (action.type) {
   
    
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case 'USER_LOGIN_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });
            
        case SIGN_UP:
            return { ...state, user: action.user };
        default: return state;
    }
};
