import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelfTitle: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render(){
    const { bookshelfTitle, books, onChangeShelf } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ bookshelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((bookId) => (
              <li key={bookId}>
                <Book 
                  book={ bookId } 
                  onChangeShelf={ onChangeShelf }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
