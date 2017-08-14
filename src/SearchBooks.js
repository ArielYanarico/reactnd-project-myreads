import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  state = {
    query: ''
  }

  searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
  showingBooks = [];

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  updateShelf = () => {}

  searchBooks() {
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    //TODO: Make search for all terms
    //this.searchTerms.forEach((term) => {
      BooksAPI.search(/**/'Android', 2).then((books) => {
        
        this.showingBooks = books.filter((book) => match.test(book.title)).map((book) => book.id)
      });
    //});
  }

	render() {
    const { query } = this.state

    let showingBooks
    if (query) {
      this.searchBooks(showingBooks)
      console.log(this.showingBooks)
    } else {
      showingBooks = [];
    }

		return(
			<div className="search-books">
        <div className="search-books-bar">
        	<Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showingBooks.map((book) => (
              <li key={book}>
                <Book book={ book } onChangeShelf={ this.updateShelf }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
		);
	}
}

export default SearchBooks;
