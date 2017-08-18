import React, {Component} from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import escapeRegExp from 'escape-string-regexp';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: null,
    bookForSearching: [],
    term: ''
  }

  async componentDidMount() {
    let allBooks = await BooksAPI.getAll();
    this.setState({
      books: {
        currentlyReading: allBooks.filter((book)=>(book.shelf === 'currentlyReading')).map((book)=>(book.id)),
        wantToRead: allBooks.filter((book)=>(book.shelf === 'wantToRead')).map((book)=>(book.id)),
        read: allBooks.filter((book)=>(book.shelf === 'read')).map((book)=>(book.id))
      }
    });
  }

  updateSearch = (query = '') => {
    if (this.state.term) {
      BooksAPI.search(this.state.term, 10).then((bookForSearching) => {
        if (query) {
          const match = new RegExp(escapeRegExp(query), 'i');
          bookForSearching = bookForSearching.filter((book) => (match.test(book.title) || ( book.authors && book.authors.some((author) => (match.test(author))))));
        } 
        this.setState({ bookForSearching });
      }); 
    }
  }

  updateTerm = (term) => {
    if(term) {
      this.setState({term});
    }
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState({ books: books});
    });
  }

  async getBook(bookId) {
    if (bookId) {
      return await BooksAPI.get(bookId); 
    } 
  }

  render() {
    const { books, bookForSearching } = this.state;
   
    return (
      <div className="app">
        {(books) && (
          <Route exact path="/" render={() => (
            <ListBooks 
              books={ books }
              onChangeShelf={ this.updateShelf }
              onLoadBook={ this.getBook }
            />
          )}/>
        )}
        {(bookForSearching) && (
          <Route path="/search" render={() => (
            <SearchBooks 
              books={ bookForSearching }
              onChangeQuery={ this.updateSearch }
              onChangeShelf={ this.updateShelf }
              onChangeTerm={ this.updateTerm}
              onLoadBook={ this.getBook }
            />
          )}/>
        )}
      </div>
    );
  }
}

export default BooksApp;
