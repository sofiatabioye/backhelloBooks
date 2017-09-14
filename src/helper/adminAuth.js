import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashmessages';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default function AdminAuth(ComposedComponent) {
    class AdminAuth extends React.Component {
        componentDidMount() {
            if (this.props.user.role !== 'admin') {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Oops, you don\'t have permission to access that page'
                });
                this.context.router.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.user.role !== 'admin') {
                this.context.router.history.push('/signin');
            }
        }

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

    function mapStateToProps(state) {
        return {
            user: state.auth.user
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(AdminAuth);
}
