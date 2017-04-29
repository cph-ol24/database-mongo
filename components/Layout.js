import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default ({ children }) => (
  <div>
    <Head>
      <title>Twitter stats</title>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      />
    </Head>

    <nav className="navbar  navbar-static-top navbar-inverse">
      <ul className="nav navbar-nav">
        <li>
          <Link href="/">
            <a>Stats</a>
          </Link>
        </li>
        <li>
          <Link href="/toplist">
            <a>Toplist</a>
          </Link>
        </li>
        <li>
          <Link href="/emotionals">
            <a>Emotionals</a>
          </Link>
        </li>
      </ul>
    </nav>

    {children}
    <style jsx>{`
      .wrapper {

      }
    `}</style>
  </div>
);
