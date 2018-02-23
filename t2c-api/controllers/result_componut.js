var order_modal = require('../models/order');
var patient_modal = require('../models/patient');
var result_componut_model = require('../models/result_componuts');
var ResultOrderTermRef_model = require('../models/result_orderterm_reference');
var moment = require('moment');

exports.create_new_result_componut = function(req, res) {
    var name = ((req.body.name) ? req.body.name : '');
    var desc = ((req.body.desc) ? req.body.desc: '');
    var unit = ((req.body.unit) ? req.body.unit : '');
    var ref_value = ((req.body.reference_value) ? req.body.reference_value : '');
    var dt_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    result_componut_model.create_result_componut_table(req,res);
    result_componut_model.insert_result_componut(req,res,name,desc,unit,ref_value,dt_time);
};

exports.get_all_result_componuts_info = function(req,res,callback){
    result_componut_model.get_all_result_componuts_info(req,function(err,result){
      if(err) console.log(err);
      callback(err,result);
    });
};

exports.create_result_orderTerm_reference_table = function(req,res,callback){
    ResultOrderTermRef_model.insert_ResultOrderTermRef(req,function(err,result){
      if(err) console.log(err);
      callback(err,result);
    });
};

exports.get_all_resultordertermref = function(req,res,callback){
    ResultOrderTermRef_model.get_all_resultordertermref(req,function(err,result){
      if(err) console.log(err);
      callback(err,result);
    });
};

exports.get_all_resultordertermref_by_orderterm_id = function(req,order_term_id,callback){
    ResultOrderTermRef_model.create_result_orderTerm_reference_table(req);
    ResultOrderTermRef_model.get_all_resultordertermref_by_orderterm_id(req,order_term_id,function(err,result){
      if(err) console.log(err);
      console.log(result);
      callback(err,result);
    });
}

exports.insert_ResultOrderTermRef = function(req,res,callback){
    ResultOrderTermRef_model.create_result_orderTerm_reference_table(req,res);
    result_componut_model.get_result_comp_info_by_name(req,req.body.compNameTxtBox,function(err,result_comp_data){
      ResultOrderTermRef_model.insert_ResultOrderTermRef(
                               req,req.body.ordertermID,
                               result_comp_data[0].ID,
                               function(err,result){
                                  if(err) console.log(err);
                                  callback(err,result);
                    });
            });
}

exports.get_all_result_componuts_info_by_multiple_id = function(req,ids,callback){
    result_componut_model.get_all_result_componuts_info_by_multiple_id(req,ids,function(err,result){
      if(err) console.log(err);
      callback(err,result);
    });
}

exports.get_all_result_componuts_info_id = function(req,id,callback){
    result_componut_model.get_all_result_componuts_info_id(req,id,function(err,result){
      if(err) console.log(err);
      callback(err,result);
    });
}
