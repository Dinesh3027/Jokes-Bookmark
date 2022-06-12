
const config = require('./db.js');
const MongoClient = require( 'mongodb' ).MongoClient;
const { ObjectId } = require( 'mongodb' );

let _db;
module.exports = {
  connect(callback) {
    MongoClient.connect( config.URL, { useNewUrlParser: true }, (err, client) => {
      // console.log("err", err);
      // console.log("client", client);
      _db  = err === undefined ? client.db(config.DB_NAME) : undefined;
      return callback(err, client);
    });
  },
  
  getDb() {
    return _db;
  },

  parseObjectId(id){
    return ObjectId(id);
  },

  getObjectArrays(ids){
    var arry = [];
     ids.forEach(it => {
      arry.push(ObjectId(it));
    });
    return arry;
  }
};