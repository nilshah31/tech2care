exports.create_result_componut_table = function(req,res){
    var con = req.app.get('con');
    sql = "CREATE TABLE ResultComponut (" +
        "ID int primary key auto_increment," +
        "name varchar(255) NOT NULL,"+
        "description varchar(255)," +
        "unit varchar(255)," +
        "reference_value varchar(255)," +
        "created_time_dt timestamp"+
        ")";
    con.query(sql, function (err, result) {
        console.log("ResultComponut Table Created");
    });
};

//insert Value into ResultComponut
exports.insert_result_componut = function(req,res,name,desc,unit,ref_value,dt_time) {
    var con = req.app.get('con');
    sql = "INSERT INTO ResultComponut (" +
        "name,description,unit,reference_value,created_time_dt) VALUES(" +
        "'"+name+"'," +
        "'"+desc+"'," +
        "'"+unit+"'," +
        "'"+ref_value+"'," +
        "'"+dt_time+"'"+
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Row Created - ResultComponut");
    });
    res.redirect('/result_componuts_management');
};

exports.get_all_result_componuts_info = function (req,callback) {
    var con = req.app.get('con');
    sql = "select * from ResultComponut ORDER BY name ASC";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_result_comp_info_by_name = function (req,name,callback) {
    var con = req.app.get('con');
    sql = "select * from ResultComponut where name='"+name+"'";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}

exports.get_all_result_componuts_info_by_multiple_id = function (req,ids,callback) {
    var con = req.app.get('con');
    sql = "select * from ResultComponut where ID in("+ids+")";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(err,result);
    });
}
