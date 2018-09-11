import React, {Component} from 'react';
import fetch from 'node-fetch';
import timeago from 'timeago.js';

export default class Bookmarks extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    fetch(this.props.feed)
      .then(response => response.json())
      .then(bookmarks => this.setState({ bookmarks }));
  }

  render() {
    const { bookmarks } = this.state;

    if (bookmarks.length === 0) {
      return (
        <img className="loading" alt="Loading..." src={this.props.loadingGif} />
      );
    }

    return bookmarks.slice(0, this.props.limit).map(bookmark => {
      const date = timeago().format(bookmark.dt);
      return (
        <div key={bookmark.dt} className="bookmark">
          <a href={bookmark.u} target="_blank">{bookmark.d}</a>
          <p>{bookmark.n}</p>
          <span className="date">{date}</span>
        </div>
      )
    });
  }
}
