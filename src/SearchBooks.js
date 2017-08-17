import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    terms: PropTypes.array.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  handleTermChange = (event) => {
    if(this.props.onChangeTerm)
    this.props.onChangeTerm(event.target.value);
  }

	render() {
    const { query } = this.state;
    const { books, terms, onChangeShelf } = this.props;
    let showingBooks;
    
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => (match.test(book.title) || ( book.authors && book.authors.some((author) => (match.test(author))))));
    } else {
      showingBooks = books;
    }

		return(
			<div className="search-books">
        <div className="search-books-bar">
        	<Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
            <div className="book-term-changer">
              <select onChange={this.handleTermChange}>
                {(terms) && (terms.map((term) => (
                  <option key={ term } value={ term }>{ term }</option>
                )))}
              </select>
            </div>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book 
                  book={ book.id } 
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

export default SearchBooks;
