// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';
import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';
import MainLayout from './components/layouts/Main';
const root = (
  <MainLayout>
    <Helmet>
        <link
          rel="stylesheet"
          href={assetUrl('../node_modules/antd/dist/antd.min.css')}
        />
    </Helmet>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  </MainLayout>
);

export default root;
