const fs = require('fs');
const path = require('path');

const FIREBASE_CREDENTIALS_PATH = path.resolve('server', 'credentials', 'firebase_credentials.json');
const FIREBASE_CREDENTIALS_PRIVATE_KEY = process.env.FIREBASE_CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, '\n') || '';

const getFirebaseCredentials = () => {
    const credentials = JSON.parse(fs.readFileSync(FIREBASE_CREDENTIALS_PATH));
    credentials['private_key'] = FIREBASE_CREDENTIALS_PRIVATE_KEY;
    return credentials;
}

module.exports = { getFirebaseCredentials };