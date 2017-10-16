export default (state = { categories: [], loading: false, errors: [] }, action = {}) => {
    switch (action.type) {
        case 'FETCH_CAT_BEGINS':
            return [
                {
                    loading: true
                }
            ];

        case 'FETCH_CAT_SUCCESS':
            return {
                loading: false,
                categories: action.categories
            };

        case 'FETCH_CAT_FAILURE':
            return {
                loading: false,
                errors: action.errors

            };

        case 'ADD_CATEGORY_SUCCESS':
            return [...state,
                {
                    loading: false,
                    categories: state.categories,
                }
            ];

        case 'ADD_CATEGORY_FAILURE':
            return [...state,
                {
                    loading: false,
                    errors: action.errors
                }
            ];

        default: return state;
    }
};
