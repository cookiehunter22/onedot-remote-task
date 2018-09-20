import React, { Component } from 'react';
import Title from '../Title/Title';
import './main.css';
import Navbar from '../Navbar/Navbar';
import DictionaryList from '../DictionaryList/DictionaryList';
import Editor from '../Editor/Editor';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editingExisting: false,
      library: [],
      activeDictionary: [],
    };
  }

  componentDidMount() {
    this.setState({
      library: JSON.parse(window.localStorage.getItem('library')) || [],
    });
  }

  handleBoardChange = () => {
    this.setState(states => ({
      editing: !states.editing,
    }));
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
      activeDictionary: [],
    });

    // save to LS
    window.localStorage.setItem('library', JSON.stringify(library));
  }

  handleDelete =(index) => {
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
      activeDictionary:
        {
          title,
          pairs,
        },
      editing: true,
      editingExisting: index,
    });
  }

  render() {
    const {
 editing, library, activeDictionary, reset 
} = this.state;
    return (
      <div className="App">
        <Title />
        <Navbar handleBoardChange={this.handleBoardChange} editing={editing} />
        <DictionaryList
          className={editing ? 'hide' : ''}
          library={library}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
        <Editor className={!editing ? 'hide' : ''} handleSave={this.handleSave} activeDictionary={activeDictionary} />
        <Footer />
      </div>
    );
  }
}

export default App;
