import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CamelCase from 'camelcase';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  //TODO: change aproach in order to avoid using this list
  shelves = ['Currently Reading', 'Want to Read', 'Read'];

	render() {
    const { books, onChangeShelf } = this.props;

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
                books={ books[CamelCase(shelf)] }
                onChangeShelf={ onChangeShelf } 
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
