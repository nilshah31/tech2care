var moment = require('moment');
//create Results table
exports.create_result_table = function(req,res){
    var con = req.app.get('con');
    sql = "CREATE TABLE IF NOT EXISTS Results (" +
        "ID int primary key auto_increment," +
        "mrn varchar(255) NOT NULL,"+
        "oid int NOT NULL," +
        "cid int NOT NULL," +
        "value varchar(255)," +
        "log timestamp )" ;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Results Table Created");
    });
};

//insert Value into order table
exports.insert_result_value = function(req,res,mrn,oid,cid,value,callback) {
    var con = req.app.get('con');
    var log = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql = "INSERT INTO Results (" +
        "mrn,oid,cid,value,log) VALUES(" +
        "'"+mrn+"'," +
        +oid+"," +
        +cid+"," +
        "'"+value+"'," +
        "'"+log+"'" +
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - Results");
        callback(err,result);
    });
};

exports.get_result_information = function(req,oid,callback) {
    var con = req.app.get('con');
    sql = "select * from Results where oid="+oid;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
};
