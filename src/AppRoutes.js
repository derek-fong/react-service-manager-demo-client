import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from './home/HomeContainer';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
    </Switch>
  );
}

export default AppRoutes;
