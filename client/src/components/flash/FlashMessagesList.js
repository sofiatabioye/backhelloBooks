import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FlashMessage from './FlashMessage';
import deleteFlashMessage from '../../actions/flashmessages';


/**
 * 
 * 
 * @class FlashMessagesList
 * @extends {React.Component}
 */
class FlashMessagesList extends React.Component {
    /**
     * 
     * 
     * @returns {FlashMessage} This displays the flash message
     * @memberof FlashMessagesList
     */
    render() {
        const messages = this.props.messages.map(message =>
            (<FlashMessage
                key={message.id}
                message={message}
                deleteFlashMessage={this.props.deleteFlashMessage}
            />)
        );
        return (
            <div> {messages} </div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    messages: state.flashMessages
});
export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
