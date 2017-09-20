import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashmessages';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default function Authenticate(ComposedComponent) {
    class Authenticate extends React.Component {
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to be logged in to access that page'
                });
                this.context.router.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.history.push('/signin');
            }
        }

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

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
