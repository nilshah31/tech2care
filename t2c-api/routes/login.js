'use strict';
var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res) {
    if(req.body.uname=='Admin' && req.body.password=='Admin'){
        req.session.user = 'Admin';
        res.redirect('/');
    }
    else{
        res.render('login',{err_msg : 'Please Enter Correct Username and Password'});
    }
});