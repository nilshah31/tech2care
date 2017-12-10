'use strict';
var patient_modal = require('../models/patient');
var rn = require('random-number');
var moment = require('moment');

exports.register_patient = function(req, res) {
    var mrn = generate_random_number();
    console.log(req.body.dob);
    var fname = ((req.body.fname) ? req.body.fname : '');
    var lname = ((req.body.lname) ? req.body.lname : '');
    var gender = ((req.body.gender) ? req.body.gender : '');
    var dob = ((req.body.dob) ? req.body.dob : '');
    var age = ((req.body.age) ? req.body.age : '');
    var add1 = ((req.body.add1) ? req.body.add1 : '');
    var add2 = ((req.body.add2) ? req.body.add2 : '');
    var city = ((req.body.city) ? req.body.city : '');
    var state = ((req.body.country_state) ? req.body.country_state : '');
    var country = ((req.body.country) ? req.body.country : '');
    var mob_num = ((req.body.phone_number) ? req.body.phone_number : '');
    var reg_dt_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var status = 1;
    patient_modal.create_patient_table(req,res);
    patient_modal.insert_new_patient(req,res,mrn,fname,lname,gender,dob,age,add1,
        add2,city,state,country,mob_num,reg_dt_time,status);
    res.sendStatus(201);
};

exports.get_patient_info = function(req, res) {
    res.sendStatus(201);
};

exports.delete_patient_info = function(req, res) {
    res.sendStatus(201);
};

exports.update_patient_info = function(req, res) {
    res.sendStatus(201);
};

function generate_random_number(){
    var options = {
        min:  9999999999
        , max:  99999999999
        , integer: true
    };
    return(rn(options));
}