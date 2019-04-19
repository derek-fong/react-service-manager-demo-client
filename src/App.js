import React, { Component, Fragment } from 'react';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <main id="main-container">
          <AppRoutes />
        </main>
      </Fragment>
    );
  }
}

export default App;
