const dbconn = require('./db');
const { request, urlencoded, response } = require('express');
const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var path=require('path');
app.use(express.static(path.join(__dirname,'public')))
var states=[];


// const pool = dbconn();
dbconn().then((pool)=>{
   // const express = require('express')
   // const app = express()
    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({ extended: false }))
    // var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // Parse URL-encoded bodies (as sent by HTML forms)
    const fastcsv = require('fast-csv'); //madhu
    const fs = require('fs');//madhu

    app.use(express.static('files'))
    app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
    app.use(express.json());
    const cors = require('cors');
    app.use(cors())

    const port = 3010
    const mysql = require('mysql')

    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname,'public','index3.html'));
    });

   /* app.get('/get-states', (req, res) => {
        console.log(pool);
        pool.query("select state from states",(err,result)=>{
            if(!err)
                res.send(result);
        })*/

    //This is for front end (React)
    app.get('/get-states', (req, res) => {
        console.log(pool);
        pool.query("select state from states",(err,result)=>{
            if(!err){
                res.send(result);
               
            }
            else{
                res.send([{"state":"Alabama"}]);
            }
                
        })

// React end


        // res.send({
        //     sucess:true,
        //     data:[
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //         "State1",
        //     ]
        // })
    });

    app.get('/get-counties/:state', (req, res) => {
        console.log(req.params.state)
        let query="select distinct county from " +req.params.state
        pool.query(query,(err,result)=>{
            if(!err){
                res.send(result);}
            else{
                res.send([{"county":"alabama County 1"},
                {"county":"alabama County 2"},
                {"county":"alabama County 3"},
                {"county":"alabama County 4"}])
            }
        })
    });

    app.get('/get-age', (req, res) => {
        console.log(pool);
        pool.query("select * from age_group",(err,result)=>{
            if(!err)
                res.send(result);
        })
    });
    var responseresult=[];
    // get end point defined for testing() starts here Vishal
     app.get('/testing', (req, res) => {
        var states=['Alabama'];
        for(let i=0;i<states.length;i++){
        let query="select distinct county from " +states[i]
        pool.query(query,(err,result)=>{
            if(!err){
                responseresult.push(result);
            }
            else{
                res.send(["Pranav","Navya","Madhavan","Aravind","Karthik","Madhu","Santhu"])
            }
        })}//end for loop
        //res.send(responseresult);
        // tomorrow make axios request for this.
    }); 
   

        app.post('/getData', (req, res) => {
            console.log(req.body);
            // res.send({
            //     sucess:true
            // })
            pool.query(req.body.query,(err,result)=>{
                if(!err)
                    res.send(result);
            })
        });

        app.post('/download-data', (req, res) => {
            pool.query(req.body.query,(err,result)=>{
                if(!err)
                {
                    let file_name = Date.now()+".csv"
                    let path = "./files/"+file_name;
                    let ws = fs.createWriteStream(path);
                    fastcsv
                    .write(result, { headers: true })
                    .pipe(ws);
                    res.send({
                        success:true,
                        download_path:"http://localhost:3010/"+file_name
                    })
                }
            })
        });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
});