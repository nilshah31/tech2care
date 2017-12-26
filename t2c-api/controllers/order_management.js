var order_modal = require('../models/order');

exports.create_new_order_term = function(req, res) {
    var name = ((req.body.name) ? req.body.name : '');
    var desc = ((req.body.desc) ? req.body.desc: '');
    var price = ((req.body.price) ? req.body.price : '');
    order_modal.create_order_term_table(req,res);
    order_modal.insert_order_term(req,res,name,desc,price);
};

exports.get_order_term_info = function(req,res){
    order_modal.get_all_order_term_info(req,res);
};