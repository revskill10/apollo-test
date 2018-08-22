// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';

import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';
import ListUser from './components/ListUser';

const root = (
  <div>
    <Helmet>
      <link
        rel="stylesheet"
        href={assetUrl('../node_modules/antd/dist/antd.min.css')}
      />
    </Helmet>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={ListUser} />
      <Route component={PageNotFound} />
    </Switch>
  </div>  
);

export default root;
