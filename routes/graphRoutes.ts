import {readFile} from "fs";
import {checkForDuplication, processData} from "../utils/graphFunctionsUtilities";

const express = require('express');
const router = express.Router();

/* GET api. */
router.get('/:clusterNumber', (req, res) => {
    const {clusterNumber} = req.params

    readFile('./HadithGraphRawData.txt', 'utf8', (err, rawData) => {
        if (err) {
            console.error('Error reading the file', err);
            res.status(500).send('Error reading the file');
            return;
        }

        const resultArray = processData(rawData);
        const result = checkForDuplication(resultArray, clusterNumber);

        if (!result) {
            res.status(404).send('Cluster not found');
            return;
        }

        // console.log(JSON.stringify(result))
        res.status(200).json(result)
        // res.json({status: 200, message: "successful", result: result});
    });
})

export default router