'use strict';
var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
module.exports = router;
var patient_api = require('../controllers/patient_management');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/new_patient', function(req, res) {
    res.render('new_patient');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/patient_search', function(req, res) {
    res.render('patient_search');
});

router.post('/new_patient',patient_api.register_patient,function (err,res) {
    console.log("Writing");
});
