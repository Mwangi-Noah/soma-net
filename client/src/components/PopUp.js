import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const PopUp = ({ error, message }) => {
  const variant = error ? 'danger' : 'success';

  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
};

Popup.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default PopUp;