import React, {Component} from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={ books }/>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
