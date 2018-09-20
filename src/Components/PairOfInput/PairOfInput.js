import React from 'react';
import PropTypes from 'prop-types';


export default class PairOfInput extends React.Component {
  handleChange = (e) => {
    const { index, handlePairUpdate } = this.props;
    const key = e.target.attributes.class.value;
    const value = e.target.value;
    handlePairUpdate(index, key, value);
  }

  handleDelete = () => {
    const { index, handlePairDelete } = this.props;
    handlePairDelete(index);
  }

  render() {
    const {
      pair: {
        domain, range, dublicated, chained, cycled,
      },
    } = this.props;

    return (
      <div className="pair">
        <div className="input-container">
          <input type="text" className="domain" value={domain} onChange={this.handleChange} />
        </div>

        <div className="input-container">
          <input type="text" className="range" value={range} onChange={this.handleChange} />
        </div>


        <i className="fas fa-trash-alt delete" onClick={this.handleDelete} />
        <i className={`fas fa-exclamation-triangle ${dublicated ? 'dublicated' : ''}`} />
        <i className={`fas fa-exclamation-triangle ${chained ? 'chained' : ''}`} />
        <i className={`fas fa-exclamation-triangle ${cycled ? 'cycled' : ''}`} />
      </div>
    );
  }
}


PairOfInput.propTypes = {
  pair: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    dublicated: PropTypes.bool,
    cycled: PropTypes.bool,
    chained: PropTypes.bool,
  }).isRequired,
};
