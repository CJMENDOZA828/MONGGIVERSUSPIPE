var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

var dbConn = require('../../config/db.js');

// Routes HERE

// INSERT
// @routes POST temperature/add
// @desc INSERT data to the database
// @access PRIVATE
router.post('/add',(req,res)=>{
const token = req.headers.authorization.split('')[1];

if (!token){
res.status(200).json({success: false, msg: 'Error, Token was not found'});
}

const decodedToken = jwt.verify(token,'secretkeyhere');
console.log(decodedToken);

     var temperature = req.body.temperature;
     var deviceId = req.body.deviceId;
     var readingDate = req.body.date;
    sqlQuery = `INSERT INTO temp_tb(temperature,device_Id,date) 
    VALUES(${temperature},"${deviceId}","${readingDate}")`;
    dbConn.query(sqlQuery, function(
        error,results,fields){
            if(error) throw error;
            res.status(200).json(results);
        })
    
})


// VIEW
// @routes GET temperature/view
// @desc View Data
// @access PUBLIC
router.get('/view',(req,res)=>{
    sqlQuery = `SELECT * FROM temp_tb`;
    dbConn.query(sqlQuery, function(
        error,results,fields){
            if(error) throw error;
            res.status(200).json(results);
        })
});

// update
router.put('/update/:id', (req, res) => {
    //print body for checking
    console.log(req.body);
    var temperature = req.body.temperature;
    var id = req.params.id;
    var readingDate = req.body.date;
    sqlQuery = `UPDATE temp_tb set temperature="${temperature}", date="${readingDate}" WHERE id="${id}"`;
    dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
    });
    });

// SEARCH
router.get('/view/:id', (req,res)=>{
    var readingId = req.params.id;
    sqlQuery =`SELECT * FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
    });
})

//SEARCH BY deviceID using like
router.get('/search/:name', (req,res)=>{
    var deviceId = req.params.name;
    // + req.params.level + " like '%" + req.params.name + "'%",
    sqlQuery =`SELECT * FROM temp_tb WHERE device_id LIKE "%${deviceId}%" `;
    dbConn.query(sqlQuery, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
    });
    });
    

// DELETE
// @routes DELETE temperature/delete/:id
// @desc DELETE Data
// @access PRIVATE
router.delete('/delete/:id', (req, res) => {
    //print body for checking
    console.log(req.params.id);
    var readingId = req.params.id;
    sqlQuery = `DELETE FROM temp_tb WHERE id=${readingId}`;
    dbConn.query(sqlQuery, function(
        error,results,fields){
            if(error) throw error;
            res.status(200).json(results);
        })
   
    });


module.exports = router;