import React, {Component} from 'react';
import fetch from 'node-fetch';

export default class Bookmarks extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    try {
      const cache = JSON.parse(localStorage.getItem('bookmarks'));
      if (cache.expiry > new Date().getTime() && cache.bookmarks.length > 0) {
        this.setState({bookmarks: cache.bookmarks});
        return;
      }
    } catch (e) {
    }

    fetch(this.props.feed)
      .then(response => response.json())
      .then(bookmarks => {
        this.setState({bookmarks});
        localStorage.setItem('bookmarks', JSON.stringify({
          bookmarks,
          expiry: new Date().getTime() + 1 * 60 * 60 * 1000
        }));
      });
  }

  render() {
    const {bookmarks} = this.state;

    if (bookmarks.length === 0) {
      return (
        <div>{this.props.loadingMessage}</div>
      );
    }

    return bookmarks.slice(0, this.props.limit).map(bookmark => {
      return (
        <div key={bookmark.dt} className="bookmark">
          <h2>
            <a href={bookmark.u} target="_blank">{bookmark.d}</a>
          </h2>
          <p>{bookmark.n}</p>
        </div>
      )
    });
  }
}
