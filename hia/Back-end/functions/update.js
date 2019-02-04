const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @param {array} ids
* @param {boolean} completed
* @returns {any}
*/
module.exports = (ids, completed, context, callback) => {
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
        updateTodo(db, ids, completed, callback);
      });
    } else {
      updateTodo(cache, ids, completed, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const updateTodo = (db, ids, completed, callback) => {
  db
    .collection('reminders')
    .updateMany(
      { _id: { $in: ids } },
      { $set: { completed: completed } },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        return callback(null, result+'');
      }
    );
};
