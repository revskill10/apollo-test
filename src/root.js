// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';
import Home from './pages/home';
import MainLayout from './components/layouts/Main';
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
    <MainLayout>
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
    </MainLayout>
  </Provider>
);
export default root;
