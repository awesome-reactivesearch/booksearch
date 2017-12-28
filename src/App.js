import React, { Component } from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="good-books-live"
        credentials="sHZWU7AYJ:d1e2922c-035c-429f-bfe4-62aa38b1c395"
      >
        Hello from ReactiveSearch!
      </ReactiveBase>
    );
  }
}

export default App;
