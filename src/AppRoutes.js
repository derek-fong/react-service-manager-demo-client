import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './core/NotFound';
import HomeContainer from './home/HomeContainer';
import RequestRoutes from './requests/RequestsRoutes';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/requests" component={RequestRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
