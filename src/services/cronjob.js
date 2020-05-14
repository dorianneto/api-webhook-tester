const cronjob = require('cron').CronJob;
const cache = require('../cache/connection');

const removeExpiredHooksJob = new cronjob('* * * * * *', () => {
  console.log(new Date().setHours(23, 59, 59));
});

module.exports = {
  removeExpiredHooksJob
};
