const DB = require("./db");

const collection_list = (req, res) => {
    const dbname = req.params.dbname;
    DB.getCollections(dbname, (err, data) => {
        res.render('collectionlist', {dbname:dbname, list: data});
    })
}

const document_list = (req, res) => {
    req.params.dbname = DB.getDatabasename();
    const params = {
        'filter': toJSON(req.body['filter']),
        'databasename': req.params.dbname,
        'collectionname': req.params.collectionname,
        'displaymodus': orDefault(req.body['displaymodus'], 'list')
    };
    console.log("Params:", params);
    DB.getDocumentList(params, (err, data) => {
        res.render('documentlist', {params:params, list:data});
    });
}

function orDefault(value, defaultvalue) {
    if (!value)
        return defaultvalue;
    else
        return value;
}

function toJSON(obj) {
    if (!obj)
        return {};
    else
        return JSON.parse(obj.replace("'", ""));
}

const database_list = (req, res) => {
    DB.getDatabases((err, data) => {
        res.render('databaselist', { list:data});
    });
}

const database_settings = (req, res) => {
    let dburl = DB.getURL();;
    res.render('settings', { url:dburl });
}

const collection_drop = (req, res) => {
    let collectionname = req.params.collectionname;
    req.params.dbname = DB.getDatabasename();
    DB.dropCollection(collectionname, (err, data) => {
        req.params.dbname = DB.getDatabasename();
        collection_list(req, res);
    })
}

const database_savesettings = (req, res) => {
    const dburl = req.body.dburl;
    DB.setURL(dburl, (err, data) => {
        database_list(undefined, res);
    })
}

module.exports = {
    collection_list,
    database_list,
    database_settings,
    database_savesettings,
    collection_drop,
    document_list
}
