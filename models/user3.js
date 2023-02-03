const MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app = express();
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
});

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'NodeJSapp';
MongoClient.connect(url, function(err, client) {
    if(err){ 
		console.log("Errreeeuuurr");
    }else{
        console.log("Connecté à MongoDB");
        const db = client.db(dbName);
		
		const createStudent = object => {
			const collection = db.collection('users');
			const student = collection.insertOne(object);
			return student
		}

		const newStudent = {
			username:"toto",
			paswword:"tutu"
		}

		const insertStudent = createStudent(newStudent);
		console.log(newStudent);
		
		setTimeout(() => {client.close()}, 1500);
	}
});