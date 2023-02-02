var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('../schemas/User');
require('dotenv').config()

// Connecting to database
const dbConnection = process.env.MONGO_URI

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

// api requests
router.post('/save', function (req, res) {
    const newStudent = new StudentModel({
        Name: req.body.name, Roll: req.body.roll, Birthday: req.body.bday, Address: req.body.address
    });
    newStudent.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});

router.get("/get-all", async (req, res) => {
    const students = await StudentModel.find()
    res.json({"All Students":students})
})

router.get("/get", (req, res) => {
    StudentModel.findOne({ StudentId: { $gt: req.query.id } }, function (err, data) {
        if (err) {
            res.status(500).send({
                "success": false
            })
        }
        else {
            res.send(data);
        }
    }
    );
});

router.delete("/del-student",(req, res) => {
    StudentModel.deleteOne({_id:{$eq:req.query.id}}, function(err, data) {
        if(err){
            res.status(500).send({
                "success" : false
            })
        } else{
            res.send(data)
        }
    })
})

router.get("/count", async (req, res) => {
    const countofAll = (await StudentModel.find()).length
    res.status(200).send({"count":countofAll})
})

router.put("/update-student", async(req, res) => {
    console.log(req.body)
    const filter = {_id:req.body.id};
    const updated = {Name: req.body.name, Roll: req.body.roll, Birthday: req.body.bday, Address: req.body.address}
    let doc = await StudentModel.findOneAndUpdate(filter, updated, {
        new:false,
        upsert:true
    })
    if(doc)
        res.status(200).send(doc)
    else
        throw new Error("Something gone bad!")
})

module.exports = router;