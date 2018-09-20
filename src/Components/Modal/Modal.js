import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modal, hideModal, handleModalContinue }) => (
  <div id="modal" className={`${!modal ? 'hide' : ''}`}>
    <div className="modal-container">
      <button type="button" className="close" aria-label="Close" onClick={hideModal}>
        <span aria-hidden="true">&times;</span>
      </button>

      <h3 className="text-uppercase">Warning</h3>
      <h5>Your changes will not be saved</h5>
      <div className="cancel" onClick={hideModal}>Cancel</div>
      <div className="ok" onClick={handleModalContinue}>Continue</div>
    </div>

  </div>
);
Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  handleModalContinue: PropTypes.func.isRequired,
};

export default Modal;
