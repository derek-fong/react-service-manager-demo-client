import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HealthNewsListContainer from './HealthNewsListContainer';
import NotFound from '../core/NotFound';

function HealthNewsRoutes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={HealthNewsListContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default HealthNewsRoutes;
