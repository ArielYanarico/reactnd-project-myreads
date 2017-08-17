import React, {Component} from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  searchTerms = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 
    'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 
    'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
    'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 
    'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 
    'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
  ];

  state = {
    books: null,
    bookForSearching: null
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

    let bookForSearching = await BooksAPI.search(this.searchTerms[0], 10);
    this.setState({ bookForSearching });
  }

  updateTerm = (term) => {
    if (term) {
      BooksAPI.search(term, 10).then((bookForSearching) => {
        this.setState({ bookForSearching });
      }); 
    }
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState({ books: books});
    });
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
            />
          )}/>
        )}
        {(bookForSearching) && (
          <Route path="/search" render={() => (
            <SearchBooks 
              books={ bookForSearching }
              terms={ this.searchTerms }
              onChangeTerm={ this.updateTerm }
              onChangeShelf={ this.updateShelf }
            />
          )}/>
        )}
      </div>
    );
  }
}

export default BooksApp;
