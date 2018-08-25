import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Provider, Subscribe } from 'unstated';
import { SharedNotificationContainer } from '../containers/Notification';

const meQuery = gql`
  query{
    me{
        id
        username
    }
  }
`
const Me = () => (
  <Provider>
    <Subscribe to={[SharedNotificationContainer]}>
      {noti => (
        <Query query={meQuery}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            if (data.me) return <div>{ data.me.username} - {noti.state.message}</div>;
          }}
        </Query>
      )}
    </Subscribe>  
  </Provider>
  );
export default Me;