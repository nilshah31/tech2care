var order_modal = require('../models/order');
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
        console.log("MRN : ");
        console.log(mrn);
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
    order_modal.get_order_by_mrn(req,req.session.mrn,function (err,result) {
        for(i=0;i<result.length;i++){
            order_modal.get_order_term_info_by_id(req,result[i].order_term_id,function(err,oTerm_result){
                if(result[i-1].status==0){
                    status = 'Ordered';
                }
                else if(result[i-1].status==1){
                    status = 'Collected';
                }
                else{
                    status = 'Completed';
                }
                order_row = {
                    name: oTerm_result[0].name,
                    price: oTerm_result[0].price,
                    status:status,
                    ordered_by:result[i-1].ordered_by,
                    speciment_collected_dt_time:result[i-1].sample_collected_timestamp.toLocaleDateString(),
                    order_date:result[i-1].dt_time.toLocaleDateString()
                };
                all_orders.push(order_row);
            });
        }
        callback(err,all_orders);
    });
};