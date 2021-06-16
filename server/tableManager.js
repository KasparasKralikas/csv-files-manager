const firebase = require('firebase-admin');
const crypto = require('crypto');
const firebaseCredentialsManager = require('./firebaseCredentialsManager.js');

const DEFAULT_COLLECTION_NAME = 'csv-files';

module.exports = class TableManager {

    constructor(collectionName = DEFAULT_COLLECTION_NAME) {
        firebase.initializeApp({
            credential: firebase.credential.cert(firebaseCredentialsManager.getFirebaseCredentials())
        });
        this.database = firebase.firestore();
        this.collection = this.database.collection(collectionName);
    }

    async createTable(name, data) {
        const hash = this.getHashFromName(name);
        const tableDoc = {
            id: hash,
            name,
            data
        };
        await this.collection.doc(name).set(tableDoc);
    }

    async getTable(name) {
        const doc = await this.collection.doc(name).get();
        return doc.exists ? doc.data() : null;
    }

    async getTableNames() {
        const result = await this.collection.get();
        const names = result.docs.map(doc => doc.data().name);
        console.log(names);
        return names;
    }
    
    getHashFromName(name, algorithm = 'sha1') {
        const hash = crypto.createHash(algorithm).update(name).digest('hex');
        return hash;
    }
}