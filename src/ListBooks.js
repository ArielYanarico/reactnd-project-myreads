import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  // TODO: Add Proptypes - Import PropTypes
  //static propTypes = {
  //}

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentWillReceiveProps(props) {
    this.setState({
      currentlyReading: [],
      wantToRead: [],
      read: []
    });
  }

	render() {
    const { currentlyReading, wantToRead, read } = {
       "currentlyReading":[
          "nggnmAEACAAJ",
          "sJf1vQAACAAJ"
       ],
       "wantToRead":[
          "evuwdDLfAyYC",
          "74XNzF_al3MC",
          "1wy49i-gQjIC"
       ],
       "read":[
          "jAUODAAAQBAJ",
          "IOejDAAAQBAJ"
       ]
    }

		return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf 
              bookshelfTitle="Currently Reading" 
              books={ currentlyReading } 
            />
            <Bookshelf 
              bookshelfTitle="Want to Read" 
              books={ wantToRead } 
            />
            <Bookshelf 
              bookshelfTitle="Read" 
              books={ read } 
            />
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
