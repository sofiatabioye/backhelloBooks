import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFlashMessage } from '../actions/flashmessages';

/**
 * 
 * 
 * @export
 * @param {any} ComposedComponent 
 * @returns {Auth} checks if user is authorized
 */
export default function Authenticate(ComposedComponent) {
    /**
     * 
     * 
     * @class Authenticate
     * @extends {React.Component}
     */
    class Authenticate extends React.Component {
        /**
         * 
         * @returns {User} authenticated or not
         * @memberof Authenticate
         */
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to be logged in to access that page'
                });
                this.context.router.history.push('/signin');
            }
        }

        /**
         * 
         * @returns {Page} when user is not authenticated
         * @param {any} nextProps 
         * @memberof Authenticate
         */
        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.history.push('/signin');
            }
        }

        /**
         * 
         * 
         * @returns {Component} on user authentication
         * @memberof Authenticate
         */
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    };

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    /**
     * 
     * 
     * @param {any} state 
     * @returns {isAuthenticated} checks if user is logged in
     */
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
