import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
  }

  state = {
    book: null
  }

  updateShelf = (shelf) => {
  	BooksAPI.update(this.state.book, shelf).then((b) => {
      //this.props.book = b;
    });
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
	      	<div className="book-top">
	          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
	          <BookShelfChanger onChangeShelf={this.updateShelf}/>
	        </div>
	        //<div>Hola</div>
	        //<div className="book-title">{ book.title }</div>
	        //{book.authors.map((author) => (
	      	  //<div key={ author } className="book-authors">{ author }</div>
	        //))}
	      )}
	    </div>
		);
	}
}

export default Book;
