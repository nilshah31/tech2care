var order_modal = require('../models/order');
var patient_modal = require('../models/patient');
var result_modal = require('../models/result');
var moment = require('moment');

exports.get_existing_result = function(req,res,order_id,callback){
    result_modal.create_result_table(req,res);
    result_modal.get_result_information(req,order_id,function(err,result_entry_result){
        callback(err,result_entry_result);
    });
}

exports.get_result_information_by_oid = function(req,order_id,callback){
    //result_modal.create_result_table(req,res);
    result_modal.get_result_information_by_oid(req,order_id,function(err,result_entry_result){
        callback(err,result_entry_result);
    });
}

exports.insert_or_update_resultValue = function(req,res,callback){
  resultCompunutsIDs = [];
  resultCompunutsValues = [];
  if(req.body.resultCompunutsIDs.length==1){
    resultCompunutsIDs.push(req.body.resultCompunutsIDs);
    resultCompunutsValues.push(req.body.resultCompunutsValue);
  }
  else{
    resultCompunutsIDs = req.body.resultCompunutsIDs;
    resultCompunutsValues = req.body.resultCompunutsValue;
  }
  var i = 0;
  order_id = parseInt(req.params.id);
  result_modal.get_result_information(req,order_id,function(err,result_entry_result){
    if(result_entry_result.length>0){
      callback("","");
    }
    else{
      resultCompunutsValues.forEach( function  (value) {
        var componut_id = parseInt(resultCompunutsIDs[i++]);
        result_modal.insert_result_value(req,res,req.session.mrn,
              order_id,
              componut_id,
              value,
              function(err,result){
                if(result){
                  console.log("");
                }
              });
      });
      order_modal.update_order_status_completed(req,order_id,2,function(err,result){
      });
    }
    callback("","");
  });
}
