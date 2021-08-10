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
    message: 'Hola soy la descripción de un usuario',
    style: { color: 'red', fontSize: 14 }
};

MessageForm.propTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default MessageForm

