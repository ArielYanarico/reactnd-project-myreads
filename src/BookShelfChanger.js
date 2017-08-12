import React, {Component} from 'react';

class BookShelfChanger extends Component {

	handleShelfChange = (event) => {
		if(this.props.onChangeShelf)
    this.props.onChangeShelf(event.target.value);
  }

	render() {
		return(
      <div className="book-shelf-changer">
        <select onChange={this.handleShelfChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
		);
	}
}

export default BookShelfChanger;
