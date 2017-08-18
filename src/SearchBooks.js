import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeQuery: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onLoadBook: PropTypes.func.isRequired
  }

  searchTerms = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 
    'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 
    'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
    'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 
    'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 
    'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
  ]

  componentDidMount() {
    this.props.onChangeTerm(this.searchTerms[0]);
    this.props.onChangeQuery();
  }

  handleQueryChange = (event) => {
    this.props.onChangeQuery(event.target.value)
  }

  handleTermChange = (event) => {
    this.props.onChangeTerm(event.target.value)
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
              onChange={(event) => this.handleQueryChange(event)} 
            />
            <div className="book-term-changer">
              <select onChange={this.handleTermChange}>
                {this.searchTerms.map((term) => (
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
