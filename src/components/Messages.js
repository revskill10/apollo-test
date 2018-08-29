import React from 'react';
import { all_messages_query } from '../graphql/messages_queries.graphql';
import { Query } from 'react-apollo';
import { List } from 'antd';
const renderMessages = (messages) => (
  <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={messages}
      renderItem={item => (<List.Item>{item.text}</List.Item>)}
    />
);

const Messages = () =>
<Query query={all_messages_query}>
  {({ loading, error, data, refetch }) => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (data) {
      return (
        <div>
          { renderMessages(data.messages) }              
        </div>
      )}}}
</Query>
export default Messages;