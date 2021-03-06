__NODE__ && require("@babel/core").transform("code", {
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
});
import '@babel/polyfill';
import 'isomorphic-fetch';
import bodyparser from 'koa-bodyparser';
import App, {
  ApolloClientToken,
  ApolloContextToken
} from 'fusion-apollo';
import RouterPlugin, {RouterToken} from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';

import ApolloClientPlugin, {
  ApolloClientEndpointToken,
  ApolloClientWsEndpointToken,
  ApolloCacheToken,
} from './plugins/apollo-client';

import HelmetPlugin from 'fusion-plugin-react-helmet-async';

import root from './root.js';

import config from '../config/config';

import {FetchToken} from 'fusion-tokens';

import {createPlugin, HttpServerToken} from 'fusion-core';

import unfetch from 'unfetch';

import I18n, {
  I18nToken,
  I18nLoaderToken,
  createI18nLoader,
} from 'fusion-plugin-i18n-react';

import JWTSession, {
  SessionSecretToken,
  SessionCookieNameToken,
  SessionCookieExpiresToken
} from 'fusion-plugin-jwt';

import ApolloServer, {ApolloServerEndpointToken} from 'fusion-plugin-apollo-server';
import {GraphQLSchemaToken} from 'fusion-apollo';
import {makeExecutableSchema} from 'graphql-tools';
import {resolvers, me} from './server/schema';
import { importSchema } from 'graphql-import'
import path from 'path';

import { apolloUploadKoa } from 'apollo-upload-server';

export default () => {
  const typeDefs = __NODE__ && importSchema(path.join(__dirname, '/graphql/schema.graphql'));  
  const app = new App(root);
  __BROWSER__ && app.register(FetchToken, window.fetch);
  __NODE__ && app.register(FetchToken, unfetch);

  app.register(I18nToken, I18n);
  __NODE__
    ? app.register(I18nLoaderToken, createI18nLoader())
    : app.register(FetchToken, fetch);

  app.register(HelmetPlugin);
  app.register(RouterToken, RouterPlugin);
  app.register(createPlugin({
    deps: {
      router: RouterToken,
    },
    middleware: ({router}) => (ctx, next) => {
      const {history} = router.from(ctx);
      console.log(`ROUTER ${JSON.stringify(history)}`)
      return next();
    }
  }));

  app.register(Styletron);
  app.register(UniversalEventsToken, UniversalEvents);
  app.register(ApolloClientToken, ApolloClientPlugin);    
  app.register(ApolloClientEndpointToken, config.graphQLEndpoint);
  //app.register(ApolloClientWsEndpointToken, config.graphQLWsEndpoint);
  
  if (__NODE__) {
    app.middleware(bodyparser());    
    app.middleware(apolloUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
    app.register(ApolloServer);
    app.register(ApolloServerEndpointToken, config.graphQLEndpoint);
    app.register(GraphQLSchemaToken, makeExecutableSchema({
      typeDefs,
      resolvers,
    }));
    
    app.register(ApolloContextToken, ctx => {
      return {
        httpContext: ctx,
        me: me
      };
    });
    if (!__DEV__) {
      app.register(createPlugin({
        middleware: () => {
          const helmet = require('koa-helmet')();
          return async (ctx, next) => {
            await helmet(ctx, () => Promise.resolve());
            await next();
          }
        }
      }));
    }
  }
  return app;
};
