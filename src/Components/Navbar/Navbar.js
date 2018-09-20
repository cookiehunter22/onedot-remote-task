import React from 'react';
import PropTypes from 'prop-types';


const Navbar = ({ handleBoardChange, editing }) => (
  <div id="navbar">
    <ul className={editing ? 'hide' : ''}>
      <li>Name</li>
      <li>Date</li>
      <li role="button" className="new-dict">
        <div onClick={handleBoardChange}>New</div>
      </li>
    </ul>

    <ul className={!editing ? 'hide' : ''}>
      <li>Domain</li>
      <li>Range</li>
      <li role="button" className="new-dict">
        <div onClick={handleBoardChange}>Back</div>
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {
  editing: PropTypes.bool.isRequired,
  handleBoardChange: PropTypes.func.isRequired,
};
export default Navbar;
