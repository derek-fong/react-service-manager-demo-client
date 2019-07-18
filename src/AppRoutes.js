import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './core/NotFound';
import HealthNewsRoutes from './health-news/HealthNewsRoutes';
import HomeContainer from './home/HomeContainer';
import RequestRoutes from './requests/RequestsRoutes';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/health-news" component={HealthNewsRoutes} />
      <Route path="/requests" component={RequestRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
