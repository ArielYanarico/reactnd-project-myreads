import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Bookshelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelfTitle: PropTypes.string.isRequired
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.props.onUpdateShelf(books);
    });
  }

  render(){
    const { bookshelfTitle, books } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ bookshelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((bookId) => (
              <li key={bookId}>
                <Book book={ bookId } onChangeShelf={ this.updateShelf }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
