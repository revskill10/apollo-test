import uuidv4 from 'uuid/v4';
import { pipeline } from 'stream';
import pubsub, { EVENTS } from './subscription';
import { waitForAllUploads } from './utils';
import { GraphQLUpload } from 'apollo-upload-server'

import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';

const env = config().parsed;

cloudinary.config({
  cloud_name: env.cloudinary_cloud_name,
  api_key: env.cloudinary_api_key,
  api_secret: env.cloudinary_api_secret,
});

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

const processStream = ({ readStream, cloudinary}) => {
  return new Promise( (resolve, reject) => {
    const upload_stream=cloudinary.uploader.upload_stream({tags: 'basic_sample'},function(err,image) {
      console.log();
      console.log("** Stream Upload");
      if (err){ console.warn(err);}
      console.log("* Same image, uploaded via stream");
      console.log("* "+image.public_id);
      console.log("* "+image.url);
      resolve(image.url);
      //let uploads = {};
      //waitForAllUploads(filename,err,image, cloudinary, uploads);
    });
    readStream.pipe(upload_stream);
  });
}

export const resolvers = {
  Query: {
    me: (_parent, _args, { me }) => {
      return me;
    },
    user: (_parent, { id }) => {
      return users[id]
    },
    users: (_parent, _args, { httpContext, me }) => {
      console.log(JSON.stringify(httpContext));
      console.log(JSON.stringify(me));
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
  Upload: GraphQLUpload,
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
      pubsub.publish(EVENTS.MESSAGE.CREATED, {
        messageCreated: { message },
      });
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
    uploadFile: async (_parent, { file }) => {
      try {
        const { filename, mimetype, createReadStream } = await file
        console.log(JSON.stringify(file));
        console.log(filename);
        console.log(mimetype);
        if (createReadStream && typeof(createReadStream) === 'function') {
          const readStream = createReadStream()
          //const wstream = fs.createWriteStream(`/Users/revskill/${filename}`);
          //rstream.pipe(wstream);
          // Promisify the stream and store the file, then…
          return await processStream({ readStream, cloudinary})
            .then(image_url => { return image_url })
            .catch(err => { return '' })
        } else {
          console.log('no upload');
          return '';
        }
      } catch(err) {
        console.log(err);
        return '';
      }
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => {                
        return pubsub.asyncIterator(EVENTS.MESSAGE.CREATED);
      },
    },
  },
};

export { me };
