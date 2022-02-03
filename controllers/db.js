'use strict';

const MongoClient = require('mongodb').MongoClient;

let url = "mongodb://localhost:27017";    

let client = null;
let databasename = null;
let collectionname = null;
let displaymodus = "list";

function connect() {
    client = new MongoClient(url);
    client.connect();
}

const getDatabases = (callback) => {
    try {
        const databases = [];
        client = get();
        const connect2 = client.db("").admin();
        connect2.listDatabases((err, db) => {
            callback(undefined, db.databases);
        })
    } catch (error) {
        callback(error, null);
    }
}

const setURL = (dburl, callback) => {
    url = dburl;
    callback(undefined, undefined);
};

const getDocumentList = (dbname, colname, callback) => {
    client = get();
    let doccount = 0;
    // count ALL documents for client-side paging (future feature)
    client.db(dbname).collection(colname).count(function(err, count) {
        doccount = count;
        client.db(dbname).collection(colname).find({},{limit:50}).toArray(function(err, docs) {
            docs.doccount = doccount;
            callback(undefined, docs);
        });
    });
};

const getCollections = (dbname, callback) => {
    const collection = [];
    databasename = dbname;
    client = get();
    const connect = client.db(dbname);
    connect.listCollections().toArray(function(err, names) {
        names.forEach(function (item) {
            collection.push(item.name);
        });
        callback(undefined, collection);
    });
};

const dropCollection = (collectionname, callback) => {
    client = get();
    const connect = client.db(databasename);
    console.log("ich droppe ", collectionname, " in der Datenbank ", databasename);
    connect.dropCollection(collectionname, function(err,res) {
        callback(undefined, "ok");
    });
};

function get() {
    if (client) {
        console.log("use old connection");
        return client;
    }
    else {
        console.log("create new connection:", url);
        connect();
        return client;
    }
}

function getURL() {
    if (client) {
        return (client.s.url);
    } else
        return "";
}

function getDatabasename() {
    if (client) {
        return databasename;
    } else
        return "";
}

function close() {
    client.close();
}

module.exports = {
    getCollections,
    getDatabases,
    setURL,
    getURL,
    getDatabasename,
    dropCollection,
    getDocumentList
};
