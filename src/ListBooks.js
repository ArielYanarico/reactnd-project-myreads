import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import CamelCase from 'camelcase';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  shelves = ['Currently Reading', 'Want to Read', 'Read'];

  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: props.books.filter((book)=>(book.shelf === 'currentlyReading')).map((book)=>(book.id)),
      wantToRead: props.books.filter((book)=>(book.shelf === 'wantToRead')).map((book)=>(book.id)),
      read: props.books.filter((book)=>(book.shelf === 'read')).map((book)=>(book.id))
    };
  }

  updateBooks = (updatedBooks) => {
    this.setState( updatedBooks );
  }

	render() {
		return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelves.map((shelf) => (
              <Bookshelf 
                key={ shelf }
                bookshelfTitle={ shelf }
                books={ this.state[CamelCase(shelf)] }
                onUpdateShelf={this.updateBooks} 
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
		);
	}
}

export default ListBooks;
