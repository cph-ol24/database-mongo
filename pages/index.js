import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Index = props => (
  <Layout>
    <div>
      Found {props.uniqueUsers} unique users
    </div>

    <h1>Most active users</h1>
    <ul>
      {props.mostActiveUsers.map(item => (
        <li key={item._id}>
          {item._id} with {item.count} tweets
        </li>
      ))}
    </ul>

    <h1>Users who mentions others most</h1>
    <ul>
      {props.mostMentionUsers.map(item => (
        <li key={item._id}>
          {item._id} on {item.tweets} tweets
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/twitter/actives', {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await res.json();

  return {
    ...data,
  };
};

export default Index;
