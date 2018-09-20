import React from 'react';
import PropTypes from 'prop-types';
import DictionaryItem from '../DictionaryItem/DictionaryItem';

const DictionaryList = ({
  className, library, handleBoardChange, ...props
}) => (
  <div id="dictionary-list" className={className}>
    <ul>
      {
        library.length === 0 ? (
          <div className="empty-list">
You don't have any dictinaries yet. Press
            {' '}
            <span onClick={handleBoardChange}>NEW</span>
            {' '}
to start.
          </div>
        ) : ''
      }
      {
        library.map((dict, index) => <DictionaryItem key={index} index={index} dict={dict} {...props} />)
        }
    </ul>

  </div>

);

DictionaryList.propTypes = {
  className: PropTypes.string.isRequired,
  library: PropTypes.array.isRequired,
  handleBoardChange: PropTypes.func.isRequired,
};

export default DictionaryList;
