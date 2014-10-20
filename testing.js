var kwaaiCrudwareUtils=require('./index.js').utils;
var express=require("express");
var connectionString="mongodb://127.0.0.1:27017/testdb";
var http=require("http");
var bodyParser=require('body-parser');
var mongo=require("mongodb")

var kwaaiCrudware=null;
mongo.MongoClient.connect(connectionString,function(err,database){
    kwaaiCrudware =require('./index.js').crudWare(database);
    prep();
})



var app=express();

app.set('port', process.env.PORT || 1337);
app.use(bodyParser.json());


function prep(){

var schema={
    properties:{
        name:{type:"string"},
        description:{type:"string"}
    },
    required:["name"]
}



app.get("/test",
    function(req,res,next){
        req.user={roles:["test"]};
        next();
    },
    kwaaiCrudwareUtils.onlyForRoles(["test"]),
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",sendresponse:true}),
    kwaaiCrudware.getByQuery
);

app.post("/test/validate",
    function(req,res,next){
        next();
    },
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",schema:schema,sendresponse:true,validate:true}),
    kwaaiCrudwareUtils.validateData
);


app.get("/test/:id",
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",sendresponse:true}),
    kwaaiCrudware.getById
);

app.post("/test",
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",schema:schema,sendresponse:true}),
    kwaaiCrudware.insert
);
app.put("/test/:id",
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",schema:schema,sendresponse:true}),
    kwaaiCrudware.updateFull
);

app.patch("/test/:id",
    kwaaiCrudwareUtils.setKwaaiOptions({collection:"test collection",schema:schema,sendresponse:true}),
    kwaaiCrudware.updatePart
);


var server=http.createServer(app);
server.listen(app.get('port'), function(){console.log('Express server listening on port ' + app.get('port'));});
}