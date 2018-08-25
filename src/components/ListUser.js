import React from 'react'
import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Provider, Subscribe } from 'unstated';
import { SharedNotificationContainer } from '../containers/Notification';

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

class Event extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message){
      this.props.noti.onNewData(this.props.message.text);
    }
  }
  render() {
    const { noti } = this.props;
    return (
      <h4>Text: {noti.state.message}</h4>
    )
  }
}
const EventLog = () => (
  <Subscribe to={[SharedNotificationContainer]}>
    {noti => (
      <Subscription subscription={MESSAGE_CREATED}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data && data.messageCreated) {
          return <Event noti={noti} message={data.messageCreated.message} />
        } else return <div>Lol</div>;
      }}
    </Subscription>
    )}
  </Subscribe>
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
    <Provider>
      <EventLog />  
    </Provider>
  </div>
);

export default UsersList