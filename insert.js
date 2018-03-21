var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

    var url = 'mongodb://localhost:27017/video';


MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("Lliga");

  var myobj = { Nombre: "Sevilla", Competicion: "Liga Santander", Color1: "Rojo", Color2: "Blanco" };
  dbo.collection("Equipos").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 