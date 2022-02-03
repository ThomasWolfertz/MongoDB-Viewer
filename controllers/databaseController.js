const DB = require("./db");

const collection_list = (req, res) => {
    const dbname = req.params.dbname;
    DB.getCollections(dbname, (err, data) => {
        res.render('collectionlist', {dbname:dbname, list: data});
    })
}

const document_list = (req,res) => {
    let collectionname = req.params.collectionname;
    let displaymodus = req.params.displaymodus;
    req.params.dbname = DB.getDatabasename();
    DB.getDocumentList("", "", (err, data) => {
        res.render('documentlist', {databasename: req.params.dbname, collectionname:collectionname, displaymodus:displaymodus, list:data});
    });
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
        /*DB.getDatabases((err, data) => {
            res.render('databaselist', { list:data});
        });*/
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
