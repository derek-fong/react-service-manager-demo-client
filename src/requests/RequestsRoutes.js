import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequestListContainer from './RequestListContainer';
import NotFound from '../core/NotFound';

function RequestRoutes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={RequestListContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default RequestRoutes;
