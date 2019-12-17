
const fs = require('fs');
const csv = require('fast-csv');

const USER_LIST = './src/user-list.csv';
const MAILING_LIST = './src/mailing-list.csv';

fs.createReadStream(USER_LIST)
    .pipe(csv.parse())
    .on('data', row => {
        console.log(row);
    })
    .on('end', () => {
        console.log('end');
    });
