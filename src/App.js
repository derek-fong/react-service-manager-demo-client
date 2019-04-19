import React, { Component, Fragment } from 'react';

import AppRoutes from './AppRoutes';
import Header from './core/Header';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main id="main-container">
          <AppRoutes />
        </main>
      </Fragment>
    );
  }
}

export default App;
