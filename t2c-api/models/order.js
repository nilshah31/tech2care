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

exports.get_all_order_term_info = function (req,callback) {
    var con = req.app.get('con');
    sql = "select * from Order_Term ORDER BY name ASC";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_order_term_info_by_name = function (req,name,callback) {
    var con = req.app.get('con');
    sql = "select * from Order_Term where name='"+name+"'";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_order_term_info_by_id = function (req,id,callback) {
    var con = req.app.get('con');
    sql = "select * from Order_Term where ID="+id+"";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.create_orders_table = function(req){
    var con = req.app.get('con');
    sql = "CREATE TABLE Orders (" +
        "ID int primary key auto_increment," +
        "mrn varchar(16) NOT NULL,"+
        "order_term_id int," +
        "status int NOT NULL," +
        "ordered_by varchar(255)," +
        "sample_collected_timestamp timestamp," +
        "dt_time timestamp)";
    con.query(sql, function (err, result) {
        console.log("Orders Table Created");
    });
};

exports.insert_new_order = function(req,mrn,order_term_id,status,order_by,
                                    sample_collected,dt_time,callback) {
    var con = req.app.get('con');
    sql = "INSERT INTO Orders (" +
        "mrn,order_term_id,status,ordered_by,dt_time) VALUES(" +
        "'"+mrn+"'," +
        ""+order_term_id+"," +
        ""+status+"," +
        "'"+order_by+"'," +
        "'"+dt_time+"'" +
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - Orders");
        callback(null,result);
    });
};

exports.get_order_by_mrn = function(req,mrn,callback){
    var con = req.app.get('con');
    console.log(mrn);
    sql = "select * from Orders where mrn="+mrn+"";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
};

