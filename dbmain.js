// dbtest.js

import dbClient from './utils/db';

const waitConnection = () => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (dbClient.isAlive()) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  });
};

(async () => {
  console.log('Connecting to MongoDB...');
  await waitConnection();
  console.log('Connection status:', dbClient.isAlive());
  console.log('Number of users:', await dbClient.nbUsers());
  console.log('Number of files:', await dbClient.nbFiles());
  process.exit(0);
})();
