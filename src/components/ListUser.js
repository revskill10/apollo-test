import React from 'react'
import { Query } from 'react-apollo'
import { all_users_query } from '../graphql/users_queries.graphql'
import Steps from './ListUser/steps';

const User = ({user}) => 
  <div>
    Id: { user.id }
    Username: { user.username }
  </div>


const renderUsers = (users) =>
  <div className='w-100 flex justify-center'>
    <div className='w-100' style={{ maxWidth: 400 }}>
      {users.map((user) =>
        <User key={user.id} user={user} />
      )}      
      <Steps />
    </div>    
  </div>

const UsersList = () => (
  <Query query={all_users_query}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      if (data.users) return renderUsers(data.users);
    }}
  </Query>
);

export default UsersList