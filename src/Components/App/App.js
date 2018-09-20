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
    this.setState({
      library: JSON.parse(window.localStorage.getItem('library')) || [],
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
        date: (new Date()).toLocaleDateString('en-GB', {
          minute: 'numeric', hour: 'numeric', month: 'numeric', year: 'numeric', day: 'numeric',
        }),
        content: validatedDict.newDict,
      };
      // save
      this.handleSave(newDict);
    }
  }

  handleSave = (newDict) => {
    const { library, editingExisting } = this.state;
    if (editingExisting || editingExisting === 0) {
      library[editingExisting] = newDict;
    } else {
      library.push(newDict);
    }

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
    const { content, title } = library[index];
    const pairs = Object.keys(content).map(key => ({
      domain: key,
      range: content[key],
    }));
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
          handleBoardChange ={this.handleBoardChange}
        />
        <Editor
          className={!editing ? 'hide' : ''}
          handleSaveClick={this.handleSaveClick}
          activeDictionary={{ title, input }}
          handlePairUpdate={this.handlePairUpdate}
          handlePairDelete={this.handlePairDelete}
          handleTitleChange={this.handleTitleChange}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
