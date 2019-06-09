import * as _ from 'lodash';
import * as React from 'react';

import {Routes} from 'pages/routes';
import {
  Route,
  Switch,
  withRouter
} from 'react-router';

import {BrowserRouter} from 'react-router-dom';
import {FanPage} from 'pages/FanPage/FanPage';



const App: React.SFC = () => {
  const elRoutes = _.map(Routes, route => (
    <Route
      exact
      key={route.path}
      path={route.path}
      component={route.component} />
  ));

  return (
    <BrowserRouter>
      <Switch>
        {elRoutes}

        <Route path={Routes.fanExperience.path} component={withRouter(FanPage)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
