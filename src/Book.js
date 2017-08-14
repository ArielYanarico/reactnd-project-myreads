import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
  }

  state = {
    book: null
  }

  handleShelfChange = (event) => {
		if(this.props.onChangeShelf)
    this.props.onChangeShelf(this.state.book, event.target.value);
  }

  componentDidMount() {
    BooksAPI.get(this.props.book).then((book) => {
      this.setState({ book });
    });
  }

	render() {
    const { book } = this.state;
		return(
			<div className="book">
	      {(book) && (
	      	<div className="book">
		      	<div className="book-top">
		          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		          <div className="book-shelf-changer">
				        <select onChange={this.handleShelfChange}>
				          <option value="none" disabled>Move to...</option>
				          <option value="currentlyReading">Currently Reading</option>
				          <option value="wantToRead">Want to Read</option>
				          <option value="read">Read</option>
				          <option value="none">None</option>
				        </select>
				      </div>
		        </div>
		        <div className="book-title">{ book.title }</div>
		        {(book.authors) && (book.authors.map((author) => (
		      	  <div key={ author } className="book-authors">{ author }</div>
		        )))}
		      </div>
	      )}
	    </div>
		);
	}
}

export default Book;
