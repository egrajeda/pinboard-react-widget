import React from 'react';
import ReactDOM from 'react-dom';
import Bookmarks from './Bookmarks';

const container = document.getElementById('bookmarks');
ReactDOM.render(
  <Bookmarks feed={container.getAttribute('data-feed')}
             limit={container.getAttribute('data-limit')}
             loadingMessage={container.getAttribute('data-loading-message')} />,
  container);
