import { FETCH_CAT_SUCCESS, ADD_CATEGORY_BEGINS, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from '../actions/actionTypes';

export default (state = { categories: [], loading: false, errors: {}, message: {} }, action = {}) => {
    switch (action.type) {
        case 'FETCH_CAT_BEGINS':
            return {
                loading: true
            };

        case FETCH_CAT_SUCCESS:
            return { ...state,
                loading: false,
                categories: action.categories
            };

        case 'FETCH_CAT_FAILURE':
            return { ...state,
                loading: false,
                errors: action.errors

            };
        case ADD_CATEGORY_BEGINS:
            return {
                loading: true
            };

        case ADD_CATEGORY_SUCCESS:
            return { ...state,
                categories: {
                    categories: state.categories.categories.concat(action.category)
                }
            };

        case ADD_CATEGORY_FAILURE:
            return { ...state,
                errors: action.errors
            }
            ;

        default: return state;
    }
};
