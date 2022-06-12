const config = require('../database/db.js');
const clientDB = require('../database/manager.js');
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

var db = clientDB.getDb();
clientDB.connect((err, client) => {
    // console.log("client", client);
    db = client.db(config.DB_NAME);
});

router.use(bodyParser.json()).use(
    bodyParser.urlencoded({
        extended: true,
    })
);

router.get("/jokes/", (req, res) => {
    db.collection(config.COLLECTION).find({}).toArray(function(err, data) {
        if(err)
            res.json({status: 1, message: err})
         else
            res.json(data);
    });
});

router.post("/joke/", (req, res) => {
    var jokeObject = req.body.joke;
    db.collection(config.COLLECTION).insertOne(jokeObject, function(err, data) {
        if(err)
            res.json({status: 1, message: err})
         else
            res.json({status: 0, message: 'Successfully Recorded the Joke', details: data});
    });
});

router.delete("/joke/", (req, res) => {
    var ids = req.body.jokes;
    // var idObjects = clientDB.getObjectArrays(ids);
    // console.log("idObjects", idObjects);
    if(ids.length > 1){
        db.collection(config.COLLECTION).deleteMany({'joke':{'$in': ids}}, function(err, data) {
            if(err)
                res.json({status: 1, message: err})
             else
                res.json({status: 0, message: 'Deleted '+ data.deletedCount +' Jokes', details: data});
        });
    } else {
        db.collection(config.COLLECTION).deleteOne({'joke': ids[0]}, function(err, data) {
            if(err)
                res.json({status: 1, message: err})
             else
                res.json({status: 0, message: 'Deleted the Joke', details: data});
        });
    }
});

module.exports = {
    router: router
};