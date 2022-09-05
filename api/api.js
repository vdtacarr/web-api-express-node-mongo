var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('../schemas/User');

 
// Connecting to database
var query = 'mongodb+srv://vedatacar:12asd34ert@vedatacar.biput.mongodb.net/?retryWrites=true&w=majority';
 
const db = query;
 
mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});
 
router.get('/save', function(req, res){
    var newStudent = new StudentModel({StudentId:102, 
        Name:"Vedat", Roll:3, Birthday:new Date(), Address:"Çeliktepe MAh."});

    newStudent.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});

router.get("/get", (req, res) => {
    var student = StudentModel.findOne({StudentId:{$gt:req.query.id}},function(err,data){
        if(err){
            console.error(err);
        }
        else{
            res.send(data);
        }
    }
        );
});
module.exports = router;