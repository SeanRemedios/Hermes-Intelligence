const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @param {array} ids
* @returns {any}
*/
module.exports = (ids, context, callback) => {
  let uri = process.env['MONGO_URI'];
  ids = ids.map(id => new mongodb.ObjectID(id));

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        destroyTodo(db, ids, callback);
      });
    } else {
      destroyTodo(cache, ids, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const destroyTodo = (db, ids, callback) => {
  db.collection('reminders').deleteMany({ _id: { $in: ids } }, (error, results) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    return callback(null, results + "");
  });
};
