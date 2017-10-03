import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFlashMessage } from '../actions/flashmessages';

/**
 * 
 * 
 * @export
 * @param {any} ComposedComponent 
 * @returns {Authorization} before component can be accessed
 */
export default function AdminAuth(ComposedComponent) {
    /**
     * 
     * 
     * @class AdminAuth
     * @extends {React.Component}
     */
    class AdminAuth extends React.Component {
        /**
         * 
         * @returns {User} permission to access page
         * @memberof AdminAuth
         */
        componentDidMount() {
            if (this.props.user.role !== 'admin') {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Oops, you don\'t have permission to access that page'
                });
                this.context.router.history.push('/signin');
            }
        }

        /**
         * 
         * @returns {User} by role
         * @param {any} nextProps 
         * @memberof AdminAuth
         */
        componentWillUpdate(nextProps) {
            if (nextProps.user.role !== 'admin') {
                this.context.router.history.push('/signin');
            }
        }

        /**
         * 
         * 
         * @returns {Component} display
         * @memberof AdminAuth
         */
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    AdminAuth.propTypes = {
        user: PropTypes.object.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    };

    AdminAuth.contextTypes = {
        router: PropTypes.object.isRequired
    };

    /**
     * 
     * 
     * @param {any} state 
     * @returns {User} from state
     */
    function mapStateToProps(state) {
        return {
            user: state.auth.user
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(AdminAuth);
}
