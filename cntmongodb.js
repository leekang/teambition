
var MongoClient = require('mongodb').MongoClient;//连接数据库
var assert = require('assert');
var data = [];
	var url = 'mongodb://localhost:27017/test';
	var findRestaurants = function(db, callback) {
   		var cursor =db.collection('person').find({name:"龙相"});
   		cursor.each(function(err, doc) {
     	assert.equal(err, null);
     	if (doc !== null) {
          data.push(doc.user);
      	}else {
          console.log(data);
        	callback();
      	}
   		});
	};
	MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  		findRestaurants(db, function() {
        console.log('close');
      	db.close();
  		});
	});
	