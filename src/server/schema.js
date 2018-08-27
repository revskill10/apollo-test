import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';

let users = {
  1: {
    id: '1',
    username: 'Truong Hoang Dung',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2]
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

let me = users[1];

export const typeDefs = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type MessageCreated {
    message: Message!
  }

  type Subscription {
    messageCreated: MessageCreated!
  }
`;

export const resolvers = {
  Query: {
    me: (_parent, _args, { me }) => {
      return me;
    },
    user: (_parent, { id }) => {
      return users[id]
    },
    users: (_parent, _args, { httpContext }) => {
      console.log(JSON.stringify(httpContext));
      httpContext.cookies.set("token1", "abcde")
      return Object.values(users);
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (_parent, { id }) => {
      return messages[id];
    },
  },
  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },
  Message: {
    user: message => {
      return users[message.userId]
    }
  },
  Mutation: {
    createMessage: (_parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);
     
      return message;
    },
    deleteMessage: (_parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  }
};

export { me };
