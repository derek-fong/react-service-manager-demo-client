import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequestCreationContainer from './RequestCreationContainer';
import RequestDetailContainer from './RequestDetailContainer';
import RequestListContainer from './RequestListContainer';
import NotFound from '../core/NotFound';

function RequestRoutes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={RequestListContainer} />
      <Route
        path={`${match.path}/create`}
        component={RequestCreationContainer}
      />
      <Route path={`${match.path}/:id`} component={RequestDetailContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default RequestRoutes;
