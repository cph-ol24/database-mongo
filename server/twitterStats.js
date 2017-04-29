import * as MongoClient from './MongoClient';

export const getUniqueUserCount = () => {
  return new Promise(async resolve => {
    const tweets = await MongoClient.getCollection('tweets');

    tweets.aggregate(
      [
        { $group: { _id: '$user' } },
        { $group: { _id: 1, count: { $sum: 1 } } },
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};

export const getMostActiveUsers = (limit = 10) => {
  return new Promise(async resolve => {
    const tweets = await MongoClient.getCollection('tweets');

    tweets.aggregate(
      [
        {
          $group: {
            _id: {
              user: '$user',
              tweetId: '$id',
            },
          },
        },
        {
          $group: {
            _id: '$_id.user',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: limit,
        },
      ],
      { allowDiskUse: true },
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};

const createEmotionalUsersQuery = sort => [
  {
    $group: {
      _id: '$user',
      average_polarity: { $avg: '$polarity' },
    },
  },
  {
    $sort: { average_polarity: sort },
  },
  {
    $limit: 5,
  },
];

export const getAngryUsers = (limit = 5) => {
  return new Promise(async resolve => {
    const tweets = await MongoClient.getCollection('tweets');

    tweets.aggregate(
      createEmotionalUsersQuery(1),
      { allowDiskUse: true },
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};

export const getHappyUsers = (limit = 5) => {
  return new Promise(async resolve => {
    const tweets = await MongoClient.getCollection('tweets');

    tweets.aggregate(
      createEmotionalUsersQuery(-1),
      { allowDiskUse: true },
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};

export const getMostMentioningUsers = (limit = 5) => {
  return new Promise(async resolve => {
    const tweets = await MongoClient.getCollection('tweets');

    tweets.aggregate(
      [
        {
          $match: {
            text: new RegExp('@\w+', 'ig'),
          },
        },
        {
          $group: { _id: '$user', tweets: { $sum: 1 } },
        },
        {
          $sort: { tweets: -1 },
        },
        {
          $limit: limit,
        },
      ],
      { allowDiskUse: true },
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};

export const getMostMentionedUsers = (limit = 10) => {
  /*
We need this code to setup the collection to read data from

db.tweets.mapReduce(
  function() {
    var regex = /@\w+/g;
    var str = this.text;
    var m;

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach(function(match, groupIndex) {
        emit(match, 1);
      });
    }
  },
  function(key, values) {
    var sum = 0;
    values.forEach(function(value) {
      sum += value;
    });
    return sum;
  },
  {
    out: { merge: "most_mentioned" }
  }
);
*/

  return new Promise(async resolve => {
    const most_mentioned = await MongoClient.getCollection('most_mentioned');

    most_mentioned.aggregate(
      [
        {
          $sort: { value: -1 },
        },
        {
          $limit: 5,
        },
      ],
      { allowDiskUse: true },
      (err, result) => {
        if (err) {
          console.error(err);
          throw err;
        }
        resolve(result);
      },
    );
  });
};
