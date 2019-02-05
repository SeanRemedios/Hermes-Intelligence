var ObjectID = require('mongodb').ObjectID;   
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const send = require('../../helpers/send.js');

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
				if (context.params.read)
					readID(context.params.id, db, callback);
				else
					readTodos(db, callback);
			});
		} else {
			if (context.params.read)
				readID(context.params.id, cache, callback);
			else
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
			text: item.phone + " " + item.fromAddress + " " + item.toAddress + " " + item.rest,
			completed: item.completed
		});
	});
};

const readID = (id, db, callback) => {
	db.collection('reminders').findOne({_id: new ObjectID(id)}, (err, result) => {
		if (err) console.log(err);
		// console.log(result);
		task = {
			phone: result.phone + "",
			fromAddress: result.fromAddress + "",
			toAddress: result.toAddress + "",
			cron: result.cron + ""
		};
		console.log(task);

		// send(
		// 	process.env.TWILIO_NUMBER,
		// 	'hi',
		// 	task.phone,
		// 	callback
		// );

		return callback(null, task);
	});
}
