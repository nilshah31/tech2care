//create Order_term table
exports.create_order_term_table = function(req,res){
    var con = req.app.get('con');
    sql = "CREATE TABLE Order_Term (" +
        "ID int primary key auto_increment," +
        "name varchar(255) NOT NULL,"+
        "description varchar(255)," +
        "price int NOT NULL )";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Order_Term Table Created");
    });
};

//insert Value into order table
exports.insert_order_term = function(req,res,name,desc,price) {
    var con = req.app.get('con');
    sql = "INSERT INTO Order_Term (" +
        "name,description,price) VALUES(" +
        "'"+name+"'," +
        "'"+desc+"'," +
        "'"+price+"'" +
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - Order Term");
    });
    res.redirect('/order_management');
};

exports.get_all_order_term_info = function (req,res) {
    var con = req.app.get('con');
    sql = "select * from Order_Term ORDER BY name ASC";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        res.render('order_management',{order_term_data:result,user:req.session.user});
    });
}