import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const meQuery = gql`
  query{
    me{
        id
        username
    }
  }
`
const Me = () => (
    <div>
      <Query query={meQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.me) return <div>{ data.me.username }</div>;
        }}
      </Query>
    </div>
  );

export default Me;