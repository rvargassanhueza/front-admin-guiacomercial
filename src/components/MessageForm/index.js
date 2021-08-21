import React from 'react'
import PropTypes from 'prop-types'

const MessageForm = ({ message='', style={} }) => {
    return (
        <div>
            <p style={ style }>{ message }</p>
        </div>
    )
}

MessageForm.defaultProps = {
    message: 'Mensaje de error',
    style: { color: 'red', fontSize: 14 }
};

MessageForm.propTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default MessageForm

