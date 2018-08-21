// @flow
import 'isomorphic-fetch';
import App, {ApolloClientToken} from 'fusion-apollo';
import GetApolloClient, { 
  ApolloClientEndpointToken,
  ApolloClientAuthKeyToken
} from 'fusion-apollo-universal-client';
import UniversalEvents, {UniversalEventsToken} from 'fusion-plugin-universal-events';
import {FetchToken} from 'fusion-tokens';
import unfetch from 'unfetch';
import root from './root';
import config from '../config/config';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';

export default () => {
  const app = new App(root);
  app.register(Styletron);
  __BROWSER__ && app.register(FetchToken, window.fetch);
  __NODE__ && app.register(FetchToken, unfetch);
  app.register(Router);

  app.register(ApolloClientToken, GetApolloClient);
  app.register(ApolloClientEndpointToken, config.graphQLEndpoint);
  app.register(ApolloClientAuthKeyToken, "bearer");
  app.register(UniversalEventsToken, UniversalEvents);
  return app;
};
