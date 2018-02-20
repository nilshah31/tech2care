'use strict';
var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
module.exports = router;
var patient_api = require('../controllers/patient_management');
var order_api = require('../controllers/order_management');
var patient_modal = require('../models/patient');
var order_modal = require('../models/order');
var result_componut_api = require('../controllers/result_componut');
var result_entry_api = require('../controllers/result_entry');

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

router.post('/resultentrybuilder/:id', function (req, res) {
  result_componut_api.insert_ResultOrderTermRef(req,res,function(err,result){
    order_modal.get_all_order_term_info(req, function (err, result) {
      result_componut_api.get_all_result_componuts_info(req, res, function (err, result_componuts_data) {
        order_modal.get_order_term_info_by_id(req,req.params.id,function (err, orderDetails) {
          result_componut_api.get_all_resultordertermref_by_orderterm_id(req,res,function(err,allComponutRefData){
            res.render('resultentrybuilder',
                      {
                        order_term_data: result,
                        result_componuts_data:result_componuts_data,
                        user: req.session.user,
                        orderDetails_data:orderDetails,
                        allComponutRefData:allComponutRefData
                      }
                  );
            });
          });
        });
      });
  });
});

router.get('/resultentrybuilder/:id', function (req, res) {
  order_modal.get_all_order_term_info(req, function (err, result) {
    result_componut_api.get_all_result_componuts_info(req, res, function (err, result_componuts_data) {
      order_modal.get_order_term_info_by_id(req,req.params.id,function (err, orderDetails) {
        result_componut_api.get_all_resultordertermref_by_orderterm_id(req,res,function(err,allComponutRefData){
          var allcomprefIds = [];
          for(var i=0;i<allComponutRefData.length;i++){
            allcomprefIds.push(allComponutRefData[i].resultcomponut_id);
          }
          result_componut_api.get_all_result_componuts_info_by_multiple_id(req,allcomprefIds,function(err,allComponutRefResult){
            res.render('resultentrybuilder',
                      {
                        order_term_data: result,
                        result_componuts_data:result_componuts_data,
                        user: req.session.user,
                        orderDetails_data:orderDetails,
                        allComponutRefResult:allComponutRefResult
                      }
                  );
            });
        });
      });
    });
  });
});

router.get('/resultentrybuilder', function (req, res) {
  order_modal.get_all_order_term_info(req, function (err, result) {
      res.render('resultentrybuilder',
                {order_term_data: result,
                user: req.session.user}
              );
  });
});

router.get('/result_componuts_management', function (req, res) {
  result_componut_api.get_all_result_componuts_info(req, res, function (err, result_componuts_data) {
      res.render('result_componuts_management', {
          user: req.session.user,
          result_componuts_data: result_componuts_data
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

router.get('/resultentry', function (req, res) {
    res.render('resultentry',{  user: req.session.user});
});

router.get('/resultentry/:id', function (req, res) {
  var order_id = req.params.id;
  result_entry_api.get_existing_result(req,res,order_id, function(err,result_entry_res){
    if(result_entry_res.length>0){
      order_modal.get_orders_info_by_id(req,order_id,function(err,ordersData){
        result_componut_api.get_all_resultordertermref_by_orderterm_id(req,ordersData[0].order_term_id,function(err,allComponutRefData){
          var allcomprefIds = [];
          for(var i=0;i<allComponutRefData.length;i++){
            allcomprefIds.push(allComponutRefData[i].resultcomponut_id);
          }
          result_componut_api.get_all_result_componuts_info_by_multiple_id(req,allcomprefIds,function(err,allComponutRefResult){
            order_api.get_all_orders_by_mrn(req, res, function (err, all_order_result,patient_data) {
                res.render('resultentry', {
                    patient_data: patient_data,
                    user: req.session.user,
                    orders_data: all_order_result,
                    allComponutRefResult:allComponutRefResult,
                    order_id:order_id,
                    result_entry_res:result_entry_res
                });
            });
          });
        });
      });
    }
    else{
      order_modal.get_orders_info_by_id(req,order_id,function(err,ordersData){
        result_componut_api.get_all_resultordertermref_by_orderterm_id(req,ordersData[0].order_term_id,function(err,allComponutRefData){
          var allcomprefIds = [];
          for(var i=0;i<allComponutRefData.length;i++){
            allcomprefIds.push(allComponutRefData[i].resultcomponut_id);
          }
          result_componut_api.get_all_result_componuts_info_by_multiple_id(req,allcomprefIds,function(err,allComponutRefResult){
            order_api.get_all_orders_by_mrn(req, res, function (err, all_order_result,patient_data) {
                res.render('resultentry', {
                    patient_data: patient_data,
                    user: req.session.user,
                    orders_data: all_order_result,
                    allComponutRefResult:allComponutRefResult,
                    order_id:order_id
                });
            });
          });
        });
      });
    }
  });
});

router.post('/resultentry/:id', function (req, res) {
    result_entry_api.insert_or_update_resultValue(req,res,function(err,result){
      res.redirect('/');
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

router.post('/result_componuts_management', function (req, res) {
    result_componut_api.create_new_result_componut(req,res);
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

router.post('/search_patient',function(req,res){
  req.session.mrn = req.body.mrn;
  order_api.get_all_orders_by_mrn(req, res, function (err, all_order_result,patient_data) {
    var pData = [];
    pData.push(patient_data[0]);
      res.render('resultentry', {
          patient_data: pData,
          user: req.session.user,
          orders_data: all_order_result
      });
  });
});
