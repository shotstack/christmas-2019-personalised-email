require('dotenv').config();

const fs = require('fs');
const request = require('request');
const csv = require('fast-csv');
const argv = require('yargs').argv;

const USER_LIST = './user-list.csv';
const MAILING_LIST = './mailing-list.csv';
const API_KEY = process.env.SHOTSTACK_KEY;
const ENDPOINT = process.env.SHOTSTACK_ENDPOINT;
const CUSTOMER_ID = process.env.SHOTSTACK_CUSTOMER_ID;
const PREVIEW_URL = process.env.SHOTSTACK_PREVIEW_URL;
const TEMPLATE = fs.readFileSync('./template.json', 'utf8');
const SKIP = argv.skip || 0;
const LIMIT = Math.min(argv.limit || 20, 20);
const fileStream = fs.createWriteStream(MAILING_LIST, { flags: 'a' });

let count = 0;

console.log(LIMIT);

fs.createReadStream(USER_LIST)
    .pipe(csv.parse())
    .on('data', row => {
        count = count + 1;

        if (count <= SKIP || count > (SKIP + LIMIT)) {
            return;
        }

        let template = JSON.parse(
            JSON.stringify(TEMPLATE).replace('{{FIRST_NAME}}', row[1].toUpperCase())
        );

        request({
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            uri: ENDPOINT,
            json: template,
            method: 'POST'
        }, function (err, res, body) {
            if (err) {
                throw err;
            }

            if (res.statusCode !== 201) {
                console.log(row[0], body);
                return;
            }

            let video = body.response.id + '.mp4';
            fileStream.write(`${row[0]},${row[1]},${video},${PREVIEW_URL}${CUSTOMER_ID}/${video}\n`);
            console.log('Video queued for: ' + row[0]);
        });
    });
