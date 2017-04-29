import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Toplist = props => (
  <Layout>
    <h1>Most mentioned users</h1>
    <ol>
      {props.mostMentioned.map(item => (
        <li key={item._id}>
          {item._id} in {item.value} tweets
        </li>
      ))}
    </ol>
  </Layout>
);

Toplist.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/twitter/toplist', {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    mostMentioned: data,
  };
};

export default Toplist;
