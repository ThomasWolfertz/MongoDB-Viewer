const express = require('express');
const databaseController = require('../controllers/databaseController');
const router = express.Router();
 
router.get("/collectionlist/:dbname", databaseController.collection_list);
router.get("/databaselist", databaseController.database_list);
router.get("/settings", databaseController.database_settings);
router.post("/savesettings", databaseController.database_savesettings);
router.get("/collectiondrop/:collectionname", databaseController.collection_drop);
router.get("/documentlist/:collectionname/", databaseController.document_list);
router.post("/documentlist/:collectionname/", databaseController.document_list);

module.exports = router;