var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017";

//Mostar Todos
router.get('/', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('Lliga');

	  db.collection('Equipos').find({}).toArray(function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();

	    res.render('lliga/mostrarTodos', { lliga: result});
	    
	  });

	});
});

//Crear
router.get('/lliga/crear', function(req, res, next) {
  res.render('lliga/crear', { title: 'Express', id: req.params.id});
});

router.post('/lliga/crear', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db("Lliga");
	  var myobj = {Nombre: req.body.nombre, Competicion: req.body.com, Color1: req.body.col1, Color2: req.body.col2};

	  db.collection("Equipos").insertOne(myobj, function(err, result) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/');
	  });
	});
});

//Editar
router.get('/lliga/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('Lliga');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('Equipos').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('lliga/editar', {equipos: result});
	  });
	});
});

router.post('/lliga/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db("Lliga");
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);
	  var myquery = { _id: o_id };
	  var newvalues = { $set: {Nombre: req.body.nombre, Competicion: req.body.com, Color1: req.body.col1, Color2: req.body.col2} };
	  
	  db.collection("Equipos").updateOne(myquery, newvalues, function(findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
  		res.redirect('/lliga/ver/' + req.params.id);
	  });
	});
});

//Borrar
router.get('/lliga/borrar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("Lliga");

	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  var myquery = { _id: o_id };

	  db.collection("Equipos").deleteOne(myquery, function(err, obj) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/');
	  });
	});
});

//Mostrar
router.get('/lliga/ver/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('Lliga');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('Equipos').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('lliga/mostrar', {equipo: result});
	  });
	});
  
});
module.exports = router;