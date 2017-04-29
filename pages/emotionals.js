import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Emotionals = props => (
  <Layout>
    <h1>Most happy users</h1>
    <ol>
      {props.happyUsers.map(item => (
        <li key={item._id}>
          {item._id} with {item.average_polarity} polarity
        </li>
      ))}
    </ol>

    <h1>Most angry users</h1>
    <ol>
      {props.angryUsers.map(item => (
        <li key={item._id}>
          {item._id} with {item.average_polarity} polarity
        </li>
      ))}
    </ol>
  </Layout>
);

Emotionals.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/twitter/emotionals', {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    ...data,
  };
};

export default Emotionals;
