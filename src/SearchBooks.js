import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {SearchTerms} from './SearchTerms';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeQuery: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onLoadBook: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onChangeQuery(SearchTerms[0]);
  }

  handleQueryChange = (event) => {
    this.props.onChangeQuery(event.target.value);
  }

	render() {
    const { books, onChangeShelf, onLoadBook } = this.props;

		return(
			<div className="search-books">
        <div className="search-books-bar">
        	<Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              onChange={this.handleQueryChange} 
            />
            <div className="book-term-changer">
              <select onChange={this.handleQueryChange} defaultValue="none">
                <option value="none" disabled>Search by term</option>
                {SearchTerms.map((term) => (
                  <option key={ term } value={ term }>{ term }</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book 
                  book={ book.id } 
                  onChangeShelf={ onChangeShelf }
                  onLoadBook={ onLoadBook }
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
