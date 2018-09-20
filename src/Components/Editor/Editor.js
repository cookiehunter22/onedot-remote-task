import React from 'react';
import PropTypes from 'prop-types';
import PairOfInput from '../PairOfInput/PairOfInput';
import Validator from '../../Validator/Validator';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Noname',
      input: [
        {
          domain: '',
          range: '',
        },
        {
          domain: '',
          range: '',
        },
      ],

    };
  }

  static getDerivedStateFromProps(props, state) {
    const { activeDictionary: { pairs, title } } = props;

    if (pairs && state.title === 'Noname') {
      return {
        input: pairs,
        title,
      };
    }
    return null;
  }

  handlePairUpdate = (index, key, value) => {
    const { input } = this.state;
    input[index][key] = value;

    // delete cells if they were emptied
    const { domain, range } = input[index];
    if (!domain && !range) {
      input.splice(index, 1);
    }
    // add empty if the last was used
    const lastItem = input[input.length - 1];
    if (lastItem.domain !== '' || lastItem.range !== '') {
      input.push({
        domain: '',
        range: '',
      });
    }
    this.setState({
      input,
    });
  }

  handlePairDelete = (index) => {
    const { input } = this.state;
    input.splice(index, 1);
    // don't delete entirely
    if (input.length === 0) {
      input.push({
        domain: '',
        range: '',
      });
    }
    this.setState({
      input,
    });
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleSaveClick = () => {
    const { handleSave } = this.props;
    const { input, title } = this.state;


    // validate
    const validatedDict = Validator.validateAll(input);


    // validation has not passed
    if (validatedDict.errors) {
      validatedDict.pairs.push({
        domain: '',
        range: '',
      });
      this.setState({
        input: validatedDict.pairs,
      });
    // succesfully validated
    } else {
      const newDict = {
        title,
        date: String((new Date()).toLocaleDateString('en-GB', {
          minute: 'numeric', hour: 'numeric', month: 'numeric', year: 'numeric', day: 'numeric',
        })),
        content: validatedDict.newDict,
      };
      // save
      handleSave(newDict);
      // clear
      this.reset();
    }
  }

  reset = () => {
    this.setState({
      title: 'Noname',
      input: [
        {
          domain: '',
          range: '',
        },
        {
          domain: '',
          range: '',
        },
      ],
    });
  }

  render() {
    const { className } = this.props;
    const { input, title } = this.state;
    return (
      <div id="editor" className={className}>
        {
            input.map((item, index) => <PairOfInput pair={item} key={index} index={index} handlePairUpdate={this.handlePairUpdate} handlePairDelete={this.handlePairDelete} />)
        }
        <div className="save-container">
            My dictionary name:
          {' '}
          <input type="text" value={title} onChange={this.handleTitleChange} />
          <div className="save" type="button" onClick={this.handleSaveClick}>Save</div>
        </div>

      </div>
    );
  }
}


Editor.propTypes = {
  className: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
};
