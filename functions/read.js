const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @returns {array}
*/
module.exports = (context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        readTodos(db, callback);
      });
    } else {
      readTodos(cache, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const readTodos = (db, callback) => {
  let cursor = db.collection('reminders').find();
  let todos = [];
  cursor.each((error, item) => {
    if (error) {
      console.log(error);
    }
    if (item == null) {
      return callback(null, todos);
    }
    todos.push({
      id: item._id + "",
      text: item.phone + " " + item.fromAddress + " " + item.toAddress + " " + text.rest,
      completed: item.completed
    });
  });
};
