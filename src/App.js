import React, { Fragment } from 'react';

import AppRoutes from './AppRoutes';
import Header from './core/Header';

function App() {
  return (
    <Fragment>
      <Header />
      <main id="main-container">
        <AppRoutes />
      </main>
    </Fragment>
  );
}

export default App;
