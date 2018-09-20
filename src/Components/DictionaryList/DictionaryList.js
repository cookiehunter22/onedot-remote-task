import React from 'react';
import PropTypes from 'prop-types';
import DictionaryItem from '../DictionaryItem/DictionaryItem';

const DictionaryList = ({ className, library, ...props }) => (
  <div id="dictionary-list" className={className}>
    <ul>
      {
        library.map((dict, index) => <DictionaryItem key={index} index={index} dict={dict} {...props} />)
        }
    </ul>

  </div>

);

DictionaryList.propTypes = {
  className: PropTypes.string.isRequired,
  library: PropTypes.array.isRequired,
};

export default DictionaryList;
