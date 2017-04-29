import { MongoClient } from 'mongodb';
import promisify from 'es6-promisify';

let _connection;

const connect = () => {
  return promisify(MongoClient.connect)(
    'mongodb://localhost:27017/mongo-twitter',
  );
};

/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
const connection = () => {
  if (!_connection) {
    _connection = connect();
  }

  return _connection;
};

export default connection;

/**
 * Returns a ready-to-use `collection` object from MongoDB.
 *
 * Usage:
 *
 *   (await getCollection('users')).find().toArray().then( ... )
 */
export async function getCollection(collectionName) {
  const db = await connection();
  return db.collection(collectionName);
}
