const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

import {
  getUniqueUserCount,
  getMostActiveUsers,
  getAngryUsers,
  getHappyUsers,
  getMostMentioningUsers,
  getMostMentionedUsers,
} from './server/twitterStats';

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/api/twitter/actives', (req, res) => {
      Promise.all([
        getUniqueUserCount(),
        getMostActiveUsers(),
        getMostMentioningUsers(),
      ]).then(([[uniqueUserCount], activeUsers, mentioningUsers]) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(
          JSON.stringify(
            {
              uniqueUsers: uniqueUserCount.count,
              mostActiveUsers: activeUsers,
              mostMentionUsers: mentioningUsers,
            },
            null,
            3,
          ),
        );
      });
    });

    server.get('/api/twitter/toplist', (req, res) => {
      Promise.all([getMostMentionedUsers()]).then(([mostMentioned]) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mostMentioned, null, 3));
      });
    });

    server.get('/api/twitter/emotionals', (req, res) => {
      Promise.all([
        getAngryUsers(),
        getHappyUsers(),
      ]).then(([angryUsers, happyUsers]) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ angryUsers, happyUsers }, null, 3));
      });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
