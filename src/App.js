import React, {Component} from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: null,
    bookForSearching: []
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

  updateSearch = (query) => {
    if (query) {
      BooksAPI.search(query, 10).then((bookForSearching) => {
        bookForSearching = bookForSearching instanceof Array ? bookForSearching : [];
        this.setState({ bookForSearching });
      });
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
          <Route path="/search"  render={({ history }) => (
            <SearchBooks
              books={ bookForSearching }
              onChangeQuery={ this.updateSearch }
              onChangeShelf={ this.updateShelf }
              onLoadBook={ this.getBook }
              history={ history }
            />
          )}/>
        )}
      </div>
    );
  }
}

export default BooksApp;
