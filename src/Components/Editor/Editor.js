import React from 'react';
import PropTypes from 'prop-types';
import PairOfInput from '../PairOfInput/PairOfInput';


const Editor = ({
  className, handleTitleChange, handleSaveClick, activeDictionary: { input, title }, ...props
}) => (
  <div id="editor" className={className}>
    {
          input.map((item, index) => <PairOfInput pair={item} key={index} index={index} {...props} />)
      }
    <div className="save-container">
          Dictionary name:
      {' '}
      <div className="input-title">
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>

      <div className="save" onClick={handleSaveClick}>Save</div>
    </div>

  </div>
);


Editor.propTypes = {
  className: PropTypes.string.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  handlePairDelete: PropTypes.func.isRequired,
  handlePairUpdate: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  activeDictionary: PropTypes.shape({
    input: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};


export default Editor;
