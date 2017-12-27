exports.get_patient_info = function (req,res,fname,lname,phone) {
    var con = req.app.get('con');
    sql = "select * from Patient where mob_num="+phone+" or fname='"+fname+"'" +
        " or lname='"+lname+"'";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        res.render('patient_search',{patient_data:result,user:req.session.user});
    });
};

exports.get_all_patient_info = function (req,res) {
    var con = req.app.get('con');
    sql = "select * from Patient ORDER BY reg_dt_time DESC";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        res.render('index',{patient_data:result,user:req.session.user});
    });
};

exports.get_patient_info_by_mrn = function (req,mrn,callback) {
    var con = req.app.get('con');
    sql = "select * from Patient where MRN="+mrn+"";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        callback(null,result);
    });
};

exports.insert_new_patient = function(req,res,mrn,fname,lname,gender,dob,age,add1,
                                      add2,city,state,country,mob_num,reg_dt_time,status){
    var con = req.app.get('con');
    sql = "INSERT INTO Patient (" +
        "MRN,fname,lname,gender,dob,age,add1,add2,city,state,country" +
        ",mob_num,reg_dt_time,status) VALUES(" +
        "'"+mrn+"',"+
        "'"+fname+"',"+
        "'"+lname+"',"+
        "'"+gender+"',"+
        "'"+dob+"',"+
        age+","+
        "'"+add1+"',"+
        "'"+add2+"',"+
        "'"+city+"',"+
        "'"+state+"',"+
        "'"+country+"',"+
        mob_num+","+
        "'"+reg_dt_time+"',"+
        "'"+status+"'"+
        ")";
    con.query(sql, function (err, result) {
        console.log("Patient Created");
    });
    res.redirect('/');
};

//create Patient table
exports.create_patient_table = function(req,res){
    var con = req.app.get('con');
    console.log("coming create");
    sql = "CREATE TABLE Patient (" +
        "ID int primary key auto_increment," +
        "MRN varchar(16) NOT NULL,"+
        "fname varchar(255) NOT NULL," +
        "lname varchar(255)," +
        "gender varchar(1)," +
        "dob date,"+
        "age int,"+
        "add1 varchar(255),"+
        "add2 varchar(255),"+
        "city varchar(255),"+
        "state varchar(255),"+
        "country varchar(255),"+
        "mob_num varchar(10),"+
        "reg_dt_time timestamp,"+
        "status BOOLEAN"+
        ")";
    con.query(sql, function (err, result) {
        console.log("Patient Table Created");
    });
};