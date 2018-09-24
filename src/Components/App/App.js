import React, { Component } from 'react';
import Title from '../Title/Title';
import './main.css';
import Navbar from '../Navbar/Navbar';
import DictionaryList from '../DictionaryList/DictionaryList';
import Editor from '../Editor/Editor';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import Validator from '../../Validator/Validator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editing: false,
      editingExisting: false,
      library: [],
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

  componentDidMount() {
    const array = JSON.parse(window.localStorage.getItem('library')) || [];

    if (array.length) {
      array.sort((a, b) => a.date < b.date);
    }
    this.setState({
      library: array,
    });
  }

  handleBoardChange = () => {
    const { editing } = this.state;
    const newState = {};
    if (editing) {
      newState.modal = true;
    } else {
      newState.editing = !editing;
    }

    this.setState(newState);
  }

  handleModalContinue = () => {
    const { editing } = this.state;
    const newState = {
      modal: false,
      editing: !editing,
    };

    if (editing) {
      newState.input = [
        {
          domain: '',
          range: '',
        },
        {
          domain: '',
          range: '',
        },
      ];
      newState.title = 'Noname';
    }

    this.setState(newState);
  }

  handlePairUpdate = (index, key, value) => {
    const { input } = this.state;
    input[index][key] = value;

    // delete cells if they were emptied
    const { domain, range } = input[index];
    if (!domain && !range && input.length > 2) {
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

  handleValidateClick = () => {
    const { input } = this.state;
    // validate
    const validatedDict = Validator.validateAll(input);
    validatedDict.pairs.push({
      domain: '',
      range: '',
    });
    this.setState({
      input: validatedDict.pairs,
    });
  }

  handleSaveClick = () => {
    const { input, title } = this.state;
    // Uncomment if validation on save is needed

    // validate
    // const validatedDict = Validator.validateAll(input);
    // validation has not passed
    // if (validatedDict.errors) {
    //   validatedDict.pairs.push({
    //     domain: '',
    //     range: '',
    //   });
    //   this.setState({
    //     input: validatedDict.pairs,
    //   });
    // succesfully validated
    // } else {
    //   const newDict = {
    //     title,
    //     date: (new Date()).getTime(),
    //     content: validatedDict.newDict,
    //   };

    // const newDict = {
    //   title,
    //   date: (new Date()).getTime(),
    //   content: validatedDict.newDict,
    // };

    const domains = [];
    const ranges = [];

    // splice last empty
    if (input[input.length - 1].domain === '' && input[input.length - 1].range === '') input.splice(input.length - 1, 1);

    input.forEach((pair) => {
      domains.push(pair.domain);
      ranges.push(pair.range);
    });

    const newDict = {
      content: {
        domains,
        ranges,
      },
      title,
      date: (new Date()).getTime(),
    };


    // save
    this.handleSave(newDict);
  }

  handleSave = (newDict) => {
    const { library, editingExisting } = this.state;
    if (editingExisting || editingExisting === 0) {
      library[editingExisting] = newDict;
    } else {
      library.push(newDict);
    }

    library.sort((a, b) => a.date < b.date);

    this.setState({
      library,
      editing: false,
      editingExisting: false,
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

    // save to LS
    window.localStorage.setItem('library', JSON.stringify(library));
  }

  handleDictionaryDelete =(index) => {
    const { library } = this.state;
    library.splice(index, 1);
    this.setState({
      library,
    });
    window.localStorage.setItem('library', JSON.stringify(library));
  }

  handleEdit = (index) => {
    const { library } = this.state;
    const { title, content: { domains, ranges } } = library[index];
    const pairs = domains.map((domain, i) => ({ domain, range: ranges[i] }));

    pairs.push({
      domain: '',
      range: '',
    });
    this.setState({
      title,
      input: pairs,
      editing: true,
      editingExisting: index,
    });
  }

  hideModal = () => {
    this.setState({
      modal: false,
    });
  }

  render() {
    const {
      editing, library, title, input, modal,
    } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <Modal
            modal={modal}
            hideModal={this.hideModal}
            handleModalContinue={this.handleModalContinue}
          />
          <Title />
          <Navbar handleBoardChange={this.handleBoardChange} editing={editing} />
          <DictionaryList
            className={editing ? 'hide' : ''}
            library={library}
            handleDelete={this.handleDictionaryDelete}
            handleEdit={this.handleEdit}
            handleBoardChange={this.handleBoardChange}
          />
          <Editor
            className={!editing ? 'hide' : ''}
            handleSaveClick={this.handleSaveClick}
            activeDictionary={{ title, input }}
            handlePairUpdate={this.handlePairUpdate}
            handlePairDelete={this.handlePairDelete}
            handleTitleChange={this.handleTitleChange}
            handleValidateClick={this.handleValidateClick}
          />

        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
