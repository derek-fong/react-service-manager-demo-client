import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './core/NotFound';
import HomeContainer from './home/HomeContainer';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
