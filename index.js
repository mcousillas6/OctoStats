const dotenv = require('dotenv');
dotenv.config();

const OctoStats = require('./src/OctoStats');

const [, , org, type] = process.argv;

console.log(`Fetching repos for ${org}....`);

OctoStats.statsForOrg({ org, type: type || 'public' })
  .then(response => console.log(response))
  .catch(error => console.log('Failed to fetch information', error));
