import React from 'react';
import {asyncReactor} from 'async-reactor';

const Book = async (props) => {
  const handleShelfChange = (event) => {
		if(props.onChangeShelf)
    	props.onChangeShelf(book, event.target.value);
  };

  const book = await props.onLoadBook(props.book);

	return(
		<div className="book">
      {(book) && (
      	<div className="book">
	      	<div className="book-top">
	          <div 
	          	className="book-cover" 
	          	style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}
	          />
	          <div className="book-shelf-changer">
			        <select onChange={handleShelfChange} value={ book.shelf }>
			          <option value="move" disabled>Move to...</option>
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
};

export default asyncReactor(Book);
