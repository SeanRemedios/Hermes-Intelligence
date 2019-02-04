const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let text = context.params.text || '';
  let completed = context.params.completed || false;
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        createTodo(db, text, callback);
      });
    } else {
      createTodo(cache, text, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const createTodo = (db, text, callback) => {
  db.collection('reminders').insertOne(text, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    return callback(null, result.insertedId + '');
  });
};
