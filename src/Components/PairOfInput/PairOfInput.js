import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';


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

  highlightClass = (dublicated, cycled, chained) => {
    if (cycled) {
      return 'danger';
    }
    if (chained || dublicated) {
      return 'warning';
    }
    return '';
  }

  render() {
    const {
      pair: {
        domain, range, dublicated, chained, cycled,
      },
    } = this.props;

    return (
      <div className={`pair ${this.highlightClass(dublicated, cycled, chained)}`}>
        <div className="input-container">
          <input type="text" className="domain" value={domain} onChange={this.handleChange} />
        </div>

        <div className="input-container">
          <input type="text" className="range" value={range} onChange={this.handleChange} />
        </div>

        <ReactTooltip id="dublicated" type="warning">
          <span>Dublicate Domain or Range</span>
        </ReactTooltip>

        <ReactTooltip id="chained" type="warning">
          <span>Chained Domain</span>
        </ReactTooltip>

        <ReactTooltip id="cycled" type="error">
          <span>Cycle</span>
        </ReactTooltip>
        <i className="fas fa-trash-alt delete" onClick={this.handleDelete} />
        <i
          className={`fas fa-exclamation-triangle ${dublicated ? 'dublicated' : ''}`}
          data-tip
          data-for="dublicated"
        />
        <i
          className={`fas fa-exclamation-triangle ${chained ? 'chained' : ''}`}
          data-tip
          data-for="chained"
        />
        <i
          className={`fas fa-exclamation-triangle ${cycled ? 'cycled' : ''}`}
          data-tip
          data-for="cycled"
        />
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
  dublicated: PropTypes.bool,
  chained: PropTypes.bool,
  cycled: PropTypes.bool,
};

PairOfInput.defaultProps = {
  dublicated: false,
  chained: false,
  cycled: false,
};
