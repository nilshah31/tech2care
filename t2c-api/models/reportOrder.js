var moment = require('moment');
//create Results table
exports.create_reportOrder_table = function(req){
    var con = req.app.get('con');
    sql = "CREATE TABLE IF NOT EXISTS ReportOrder (" +
        "ID int primary key auto_increment," +
        "oid int NOT NULL,"+
        "log timestamp )" ;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("ReportOrder Table Created");
    });
};

//insert Value into ReportOrder
exports.insert_ReportOrder_value = function(req,oid,callback) {
    var con = req.app.get('con');
    var log = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql = "INSERT INTO ReportOrder (" +
        "oid,log) VALUES(" +
        +oid+"," +
        "'"+log+"'" +
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - ReportOrder");
        callback(err,result);
    });
};

exports.get_all_ReportOrder_info = function (req,callback) {
    var con = req.app.get('con');
    sql = "select * from ReportOrder";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}
