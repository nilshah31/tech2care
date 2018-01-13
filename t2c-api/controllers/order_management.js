var order_modal = require('../models/order');
var patient_modal = require('../models/patient');
var moment = require('moment');

exports.create_new_order_term = function(req, res) {
    var name = ((req.body.name) ? req.body.name : '');
    var desc = ((req.body.desc) ? req.body.desc: '');
    var price = ((req.body.price) ? req.body.price : '');
    order_modal.create_order_term_table(req,res);
    order_modal.insert_order_term(req,res,name,desc,price);
};

exports.get_order_term_info = function(req,res,redirectPage){
    order_modal.get_all_order_term_info(req,res,redirectPage);
};

exports.create_orders_table = function(req,res,redirectPage){
    order_modal.create_orders_table(req);
};

exports.place_new_order = function(req, res,callback) {
    var order_name = req.body.orderNametxtBox;
    order_modal.get_order_term_info_by_name(req,order_name,function(err,result){
        var mrn = req.session.mrn;
        var order_term_id = result[0].ID;
        var status = 0;
        var order_by = 'Admin';
        var sample_collection_timestamp = '';
        var dt_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        order_modal.insert_new_order(req,mrn,order_term_id,status,order_by,
            sample_collection_timestamp,dt_time,function(err,result){
                callback(err,result);
        });
    });
};

exports.get_all_orders_by_mrn = function(req, res,callback) {
    var all_orders = [];
    var mrn = req.session.mrn;
    order_modal.get_orders_by_mrn(req,mrn,function (err,ordered_data,term_names_result,patient_data) {
        for(var i=0;i<ordered_data.length;i++){
          status = ordered_data[i].status==0? status = 'Ordered' : ordered_data[i].status==1? status = 'Collected' : status = 'Completed';
          order_row = {
              order_id: ordered_data[i].ID,
              name: term_names_result[i].name,
              price: term_names_result[i].price,
              status: status,
              ordered_by:ordered_data[i].ordered_by,
              speciment_collected_dt_time:ordered_data[i].sample_collected_timestamp.toLocaleDateString(),
              order_date:ordered_data[i].dt_time.toLocaleDateString()
          };
          all_orders.push(order_row);
        }
        callback(err,all_orders,patient_data);
    });
};

exports.get_all_uncompleted_orders = function(req, res,callback) {
    var all_orders = [];
    order_modal.get_all_uncompleted_orders(req,function (err,ordered_data,term_names_result,patient_data) {
        for(var i=0;i<ordered_data.length;i++){
            status = "Ordered";
            order_row = {
                ID: ordered_data[i].ID,
                patient_mrn: patient_data[i].mrn,
                name: term_names_result[i].name,
                price: term_names_result[i].price,
                status:status,
                ordered_by:ordered_data[i].ordered_by,
                speciment_collected_dt_time:ordered_data[i].sample_collected_timestamp.toLocaleDateString(),
                order_date:ordered_data[i].dt_time.toLocaleDateString(),
                patient_name:String(patient_data[i].lname)+","+
                String(patient_data[i].fname),
                patient_city:String(patient_data[i].city)
            };
            all_orders.push(order_row);
        }
        callback(err,all_orders);
    });
};

exports.update_order_status = function(req,res,callback) {
  var order_id = ((req.body.order_id) ? req.body.order_id : '');
  var sp_dt_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  order_modal.update_order_status(req,order_id,1,sp_dt_time,function (err,result) {
    callback(err,result);
  });
};
