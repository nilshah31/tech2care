exports.create_result_orderTerm_reference_table = function(req,res){
    var con = req.app.get('con');
    sql = "CREATE TABLE ResultOrderTermRef (" +
        "ID int primary key auto_increment," +
        "orderterm_id int NOT NULL,"+
        "resultcomponut_id int" +
        ")";
    con.query(sql, function (err, result) {
        console.log("ResultOrderTermRef Table Created");
    });
};

//insert Value into ResultComponut
exports.insert_ResultOrderTermRef = function(req,orderterm_id,resultcomponut_id,callback) {
    var con = req.app.get('con');
    sql = "INSERT INTO ResultOrderTermRef (" +
        "orderterm_id,resultcomponut_id) VALUES(" +
        +orderterm_id +"," +
        +resultcomponut_id +
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - ResultOrderTermRef");
        callback(null,result);
    });
};

exports.get_all_resultordertermref = function (req,callback) {
    var con = req.app.get('con');
    sql = "select * from ResultOrderTermRef";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_all_resultordertermref_by_orderterm_id = function (req,ordertermid,callback) {
    var con = req.app.get('con');
    sql = "select * from ResultOrderTermRef where orderterm_id="+ordertermid;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}
