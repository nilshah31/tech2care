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
    sql = "select * from Order_Term";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_all_order_term_info_not_in_id = function (req,id,callback) {
  console.log(id)
    var con = req.app.get('con');
    sql = "select * from Order_Term where ID NOT IN ("+id+")";
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

exports.get_orders_info_by_id = function (req,id,callback) {
    var con = req.app.get('con');
    sql = "select * from Orders where ID="+id+"";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_order_term_info_by_multiple_id = function (req,id,callback) {
    var con = req.app.get('con');
    sql = "select * from Order_Term where ID in("+id+")";
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

exports.get_all_orders_by_mrn_status_resulted = function(req,mrn,callback){
    var con = req.app.get('con');
    sql = "select * from Orders where mrn="+mrn+" and status=2";
    var sql_ordered_status = "select * from Orders where mrn="+mrn+" and status=2 ORDER BY dt_time ASC";
    var sql_term_names = "select Order_Term.ID,Order_Term.name,Order_Term.price from Order_Term " +
        "INNER JOIN Orders ON Orders.order_term_id=Order_Term.ID where Orders.status=2 and Orders.mrn="+mrn;
    var sql_patient_data = "select * from Patient where " +
        "MRN="+mrn;
    con.query(sql_ordered_status, function (err, ordered_data) {
        if (err) console.log(err);
        con.query(sql_term_names, function (err, term_names_result) {
            con.query(sql_patient_data, function (err, patient_data) {
                callback(err,ordered_data,term_names_result,patient_data);
            });
        });
    });
};

exports.get_orders_by_mrn = function(req,mrn,callback){
    var con = req.app.get('con');
    sql = "select * from Orders where mrn="+mrn+"";
    var sql_ordered_status = "select * from Orders where mrn="+mrn+" ORDER BY dt_time ASC";
    var sql_term_names = "select Order_Term.ID,Order_Term.name,Order_Term.price from Order_Term " +
        "INNER JOIN Orders ON Orders.order_term_id=Order_Term.ID where Orders.mrn="+mrn;
    var sql_patient_data = "select * from Patient where " +
        "MRN="+mrn;
    con.query(sql_ordered_status, function (err, ordered_data) {
        if (err) console.log(err);
        con.query(sql_term_names, function (err, term_names_result) {
            con.query(sql_patient_data, function (err, patient_data) {
                callback(err,ordered_data,term_names_result,patient_data);
            });
        });
    });
};

exports.get_all_orders = function(req,callback){
    var con = req.app.get('con');
    sql = "select * from Orders ORDER BY dt_time ASC";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
};

exports.get_all_uncompleted_orders = function(req,callback){
    var con = req.app.get('con');
    var sql_ordered_status = "select * from Orders where status=0 ORDER BY dt_time ASC";
    var sql_term_names = "select * from Order_Term " +
        "INNER JOIN Orders ON Orders.order_term_id=Order_Term.ID where Orders.status=0";
    var sql_patient_data = "select * from Patient " +
        "INNER JOIN Orders ON Orders.mrn=Patient.mrn where Orders.status=0";
    con.query(sql_ordered_status, function (err, ordered_data) {
        if (err) console.log(err);
        con.query(sql_term_names, function (err, term_names_result) {
            con.query(sql_patient_data, function (err, patient_data) {
                callback(err,ordered_data,term_names_result,patient_data);
            });
        });
    });
};

exports.update_order_status = function(req,oid,new_status,specimen_collected_dt,callback){
    var con = req.app.get('con');
    sql = "Update Orders set status="+new_status+",sample_collected_timestamp='"+specimen_collected_dt+
          "' where ID="+oid+"";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
};

exports.update_order_status_completed = function(req,oid,new_status,callback){
    var con = req.app.get('con');
    sql = "Update Orders set status="+new_status+" where ID="+oid;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
};
