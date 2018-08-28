// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';
import Home from './pages/home';
import { Provider } from 'unstated';
import {split} from 'fusion-react';
const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading component</div>;
const LoginPage = split({
  load: () => import('./pages/login'),
  LoadingComponent,
  ErrorComponent
});

const root = (
  <Provider>
    <Helmet>
        <link
          rel="stylesheet"
          href={assetUrl('../node_modules/antd/dist/antd.min.css')}
        />
    </Helmet>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </Provider>
);
export default root;
