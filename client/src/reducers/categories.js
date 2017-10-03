export default (state = { categories: [], categories2: [], loading: false, errors: [] }, action = {}) => {
    switch (action.type) {
        case 'FETCH_CAT_BEGINS':
            return Object.assign({}, state, { loading: true });
        case 'FETCH_CAT_SUCCESS':
            return Object
                .assign({}, state, {
                    loading: false,
                    categories: action.categories
                });
        case 'FETCH_CAT_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });
        case 'ADD_CATEGORY_SUCCESS':
            return Object.assign({}, state, { loading: false, categories: action.categories });
        case 'ADD_CATEGORY_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });

        default: return state;
    }
};
