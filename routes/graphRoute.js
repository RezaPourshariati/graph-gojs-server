const express = require('express');
const {processGraphData} = require("../controllers/processGraphData");
const router = express.Router();

/* GET api. */
router.get('/clusterNumber/:clusterNumber', processGraphData)

module.exports = router;
