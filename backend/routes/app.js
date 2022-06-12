const config = require('../database/db.js');
const clientDB = require('../database/manager.js');
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json()).use(
    bodyParser.urlencoded({
        extended: true,
    })
);

router.get("/jokes/", (req, res) => {
    clientDB.connect((err, client) => {
        if (err === undefined) {
            let dbs = client.db(config.DB_NAME);
            dbs.collection(config.COLLECTION).find({}).toArray(function (err, data) {
                if (err)
                    res.json({
                        status: 1,
                        message: err
                    })
                else
                    res.json(data);
            });
        } else {
            res.json({
                status: 1,
                message: err
            })
        }
    });
});

router.post("/joke/", (req, res) => {
    var jokeObject = req.body.joke;
    clientDB.connect((err, client) => {
        if (err === undefined) {
            let dbs = client.db(config.DB_NAME);
            dbs.collection(config.COLLECTION).insertOne(jokeObject, function (err, data) {
                if (err)
                    res.json({
                        status: 1,
                        message: err
                    })
                else
                    res.json({
                        status: 0,
                        message: 'Successfully Recorded the Joke',
                        details: data
                    });
            });
        }
    });
});

router.delete("/joke/", (req, res) => {
    var ids = req.body.jokes;
    clientDB.connect((err, client) => {
        let dbs = client.db(config.DB_NAME);
        if (err === undefined) {
            if (ids.length > 1) {
                dbs.collection(config.COLLECTION).deleteMany({
                    'joke': {
                        '$in': ids
                    }
                }, function (err, data) {
                    if (err)
                        res.json({
                            status: 1,
                            message: err
                        })
                    else
                        res.json({
                            status: 0,
                            message: 'Deleted ' + data.deletedCount + ' Jokes',
                            details: data
                        });
                });
            } else {
                dbs.collection(config.COLLECTION).deleteOne({
                    'joke': ids[0]
                }, function (err, data) {
                    if (err)
                        res.json({
                            status: 1,
                            message: err
                        })
                    else
                        res.json({
                            status: 0,
                            message: 'Deleted the Joke',
                            details: data
                        });
                });
            }
        } else {
            res.json({
                status: 1,
                message: err
            })
        }
    });
});

module.exports = {
    router: router
};