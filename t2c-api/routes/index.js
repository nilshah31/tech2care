'use strict';
var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
module.exports = router;
var patient_api = require('../controllers/patient_management');
var order_api = require('../controllers/order_management');
var patient_modal = require('../models/patient');
var order_modal = require('../models/order');


router.get('/', function (req, res) {
    if (req.session.user) {
        patient_api.get_all_patient_info(req, res);
    }
    else {
        res.redirect('login');
    }
});

router.get('/new_patient', function (req, res) {
    res.render('new_patient', {user: req.session.user});
});

router.get('/patient_dashboard', function (req, res) {
    var mrn = ((req.query.mrn) ? req.query.mrn : '');
    req.session.mrn = mrn;
    order_api.create_orders_table(req, res);
    order_api.get_all_orders_by_mrn(req, res, function (err, all_order_result,patient_data) {
        res.render('patient_dashboard', {
            patient_data: patient_data,
            user: req.session.user,
            orders_data: all_order_result
        });
      });
});

router.get('/patient_search', function (req, res) {
    res.render('patient_search', {user: req.session.user});
});

router.post('/patient_search', function (req, res) {
    patient_api.get_patient_info(req, res);
});

router.post('/new_patient', patient_api.register_patient, function (err, res) {
    res.redirect('/');
});

router.post('/patient_search', patient_api.get_patient_info, function (err, res) {
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/sample_collection', function (req, res) {
    order_api.get_all_uncompleted_orders(req, res, function (err, all_order_result) {
        res.render('sample_collection', {
            user: req.session.user,
            orders_data: all_order_result
        });
    });
});

router.post('/login', function (req, res) {
    if (req.body.uname == 'Admin' && req.body.password == 'Admin') {
        req.session.user = 'Admin';
        res.redirect('/');
    }
    else {
        res.render('login', {err_msg: 'Please Enter Correct Username and Password'});
    }
});

router.get('/order_management', function (req, res) {
    order_modal.get_all_order_term_info(req, function (err, result) {
        res.render('order_management', {order_term_data: result, user: req.session.user});
    });
});

router.post('/order_management', function (req, res) {
    order_api.create_new_order_term(req, res);
});

router.post('/patient_dashboard', function (req, res) {
    order_api.place_new_order(req, res, function (err, result) {
        res.redirect('/');
    });
});

router.post('/sample_collection',function(req,res){
  order_api.update_order_status(req,res,function(err,result){
    res.redirect('/sample_collection');
  });
});
