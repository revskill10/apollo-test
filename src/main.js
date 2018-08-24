import '@babel/core';
import 'babel-polyfill';
import 'isomorphic-fetch';
import App, {ApolloClientToken} from 'fusion-apollo';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import ApolloClientPlugin, {
  ApolloClientEndpointToken,
  ApolloClientWsEndpointToken,
} from 'fusion-apollo-universal-client';

import HelmetPlugin from 'fusion-plugin-react-helmet-async';

import root from './root.js';

import config from '../config/config';

import {FetchToken} from 'fusion-tokens';

export default () => {
  const app = new App(root);
  __BROWSER__ && app.register(FetchToken, window.fetch);

  app.register(HelmetPlugin);
  app.register(Router);
  app.register(Styletron);
  app.register(UniversalEventsToken, UniversalEvents);
  app.register(ApolloClientToken, ApolloClientPlugin);    
  app.register(ApolloClientEndpointToken, config.graphQLEndpoint);
  app.register(ApolloClientWsEndpointToken, config.graphQLWsEndpoint);
 
  return app;
};