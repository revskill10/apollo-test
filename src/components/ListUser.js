import React from 'react'
import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const User = ({user}) => 
  <div>
    Id: { user.id }
    Username: { user.username }
  </div>

const ALL_USERS_QUERY = gql`
  query {
    users{
      id
      username
    }
    me{
      id
      username
    }
  }
`

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        text
    
        user {
          id
          username
        }
      }
    }
  }
`

const renderEvent = (event) => 
  <React.Fragment>
    <h4>Text: {event.message.text}</h4>
  </React.Fragment>

const EventLog = () => (
  <Subscription subscription={MESSAGE_CREATED} shouldResubscribe={true}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      if (data && data.messageCreated) return renderEvent(data.messageCreated)
      else return <div>Lol</div>;
    }}
  </Subscription>
)

const renderUsers = (users) =>
  <div className='w-100 flex justify-center'>
    <div className='w-100' style={{ maxWidth: 400 }}>
      {users.map((user) =>
        <User key={user.id} user={user} />
      )}
    </div>    
  </div>

const UsersList = () => (
  <div>
    <Query query={ALL_USERS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data.users) return renderUsers(data.users);
      }}
    </Query>
    <EventLog />
  </div>
);

export default UsersList