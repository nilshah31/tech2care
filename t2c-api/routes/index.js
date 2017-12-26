'use strict';
var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
module.exports = router;
var patient_api = require('../controllers/patient_management');

router.get('/', function(req, res) {
    if(req.session.user){
        patient_api.get_all_patient_info(req,res);
    }
    else{
        res.redirect('login');
    }
});

router.get('/new_patient', function(req, res) {
    res.render('new_patient',{user:req.session.user});
});


router.get('/patient_dashboard', function(req, res) {
    patient_api.get_patient_info_by_mrn(req,res);
});

router.get('/patient_search', function(req, res) {
    res.render('patient_search',{user:req.session.user});
});

router.post('/patient_search',function (req,res) {
    patient_api.get_patient_info(req,res);
});

router.post('/new_patient',patient_api.register_patient,function (err,res) {
    res.redirect('/');
});

router.post('/patient_search',patient_api.get_patient_info,function (err,res) {
});
