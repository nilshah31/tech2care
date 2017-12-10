//create Patient table
exports.create_user_table = function(req,res){
    var con = req.app.get('con');
    console.log("coming create");
    sql = "CREATE TABLE Users (" +
        "ID int primary key auto_increment," +
        "uname varchar(255),"+
        "password varchar(255),"+
        "reg_dt_time timestamp,"+
        "position varchar(100)"+
        "facility varchar(255)"+
        "status BOOLEAN"+
        ")";
    con.query(sql, function (err, result) {
        if (err) console.log("Error");
        console.log("User Table Created");
    });
};