import React from 'react'
import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const User = ({user}) => 
  <div>
    Email: { user.email }
    First Name: { user.firstName }
    Last Name: { user.lastName }
  </div>

const ALL_USERS_QUERY = gql`
  query allUsersQuery {
    allUsers {
      email
      id
      firstName
      lastName
    }
  }
`

const TODO_ADDED = gql`
  subscription{
    todoAdded {
      id
      title
      completed
    }
  }
`

const EventLog = () => (
  <Subscription subscription={TODO_ADDED}>
    {({ data, loading }) => (
      <h4>New todo: {!loading && data.todoAdded && data.todoAdded.title}</h4>
    )}
  </Subscription>
)

const renderUsers = (users) =>
  <div className='w-100 flex justify-center'>
    <div className='w-100' style={{ maxWidth: 400 }}>
      {users.map((user) =>
        <User key={user.id} user={user} />
      )}
    </div>
    <EventLog />
  </div>

const UsersList = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      if (data.allUsers) return renderUsers(data.allUsers);
    }}
  </Query>
);

export default UsersList