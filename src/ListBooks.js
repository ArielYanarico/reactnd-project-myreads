import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  /*state = {
    query: ''
  }*/

  // TODO: Add Proptypes - Import PropTypes
  //static propTypes = {
  //}

	render() {
    const { books } = this.props;

		return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf 
              className="bookshelf"
              bookshelfTitle="Currently Reading" 
              books={ books.filter( (book) => (book.shelf === 'currentlyReading'))} 
            />
            <Bookshelf 
              className="bookshelf"
              bookshelfTitle="Want to Read" 
              books={ books.filter( (book) => (book.shelf === 'wantToRead'))} 
            />
            <Bookshelf 
              className="bookshelf"
              bookshelfTitle="Read" 
              books={ books.filter( (book) => (book.shelf === 'read'))} 
            />
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
