var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;//连接数据库
var assert = require('assert');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/',function(req,res){
 
	var url = 'mongodb://localhost:27017/test';//test是一个数据库
  var datarr = [];
	var findRestaurants = function(db, callback) {
   		var cursor =db.collection('person').find({name:req.query.name});
   		cursor.each(function(err, doc) {
     	assert.equal(err, null);
     	if (doc !== null) {
        	datarr.push(doc.user);
      	}else {
        	callback();
      	}
   		});
	};
	MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  		findRestaurants(db, function() {
        res.send({data:datarr});
      	db.close();
  		});
	});
	
});
app.get('/project',function(req,res){
	var url = 'mongodb://localhost:27017/test';
  var userlist;
  var findRestaurants = function(db,callback){
    var cursor = db.collection('project').find({proname:req.query.workname});
    cursor.each(function(err,doc){
      assert.equal(err,null);//这个是node中的一个断言如果不相等会报错
      if(doc !== null){
        userlist = doc.userlist;
      }else{
        callback();
      }
    });
  };
  MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
      findRestaurants(db,function(){
        res.send({data:userlist});
        db.close();
      });
  });
});

app.get('/work',function(req,res){
  var url = 'mongodb://localhost:27017/test';
  var data = [];
  var findRestaurants = function(db,callback){
    var cursor = db.collection('work').find({name:"龙相"});
    cursor.each(function(err,doc){
      assert.equal(err,null);//这个是node中的一个断言如果不相等会报错
      if(doc !== null){
        data.push(doc.workname);
      }else{
        callback();
      }
    });
  };
  MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
      findRestaurants(db,function(){
        res.send({data:data});
        db.close();
      });
  });
});
app.get('/assign',function(req,res){
	var url = 'mongodb://localhost:27017/test';
  var assignlist = [];
  var findRestaurants = function(db,callback){
    var cursor = db.collection('assign').find({proname:req.query.workname});
    cursor.each(function(err,doc){
      assert.equal(err,null);
      if(doc !== null){
        var assign = {assignid:doc.assignid,assignname:doc.assignname,creator:doc.creator,executor:doc.executor,assignstate:doc.assignstate,createtime:doc.createtime,commet:doc.commet};
        assignlist.push(assign);
      }else{
        callback();
      }
    });
  };
  MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
      findRestaurants(db,function(){
        res.send({assignlist:assignlist});
        db.close();
      });
  });
});
io.on('connection',function(socket){
	//console.log('一个新用户');

	socket.on('message',function(obj){
		io.emit('message',obj);
	});
});

http.listen(3000,function(){
	console.log('listening on the port 3000');
});