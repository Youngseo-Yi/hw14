var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = "mongodb+srv://pavomare:PavoMare17@cluster0.5phcbau.mongodb.net/?retryWrites=true&w=majority";
var port =process.env.PORT || 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var port=8080; uncomment to run local

app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res) {
    const queryChoice= req.query.queryChoice;
    const textInput = req.query.textInput;

    client = new MongoClient(MongoUrl);

            async function doit() {
            try {
                await client.connect();

                var dbo = client.db("HW14");
                var coll = dbo.collection('Companies');
                const options = {
                    projection: { _id: 0, Company: 1, Ticker: 1, Price:1},
                };

                //check if they are searching company name or ticker
                if (queryChoice =='coName') {
                    myQuery = { Company: { $regex: textInput} }
                } else {
                    myQuery = { Ticker: { $regex: textInput} }
                }
                const curs = coll.find(myQuery,options);
                // print a message if no documents were found
                if ((await curs.count()) === 0) {
                    console.log("No documents found!");
                }
                //write in page for the results
                await curs.forEach(function(item){
                    res.send("<div class='myCo'>");
                    res.send("<div class='Company'>"+ item.Company+"</div>");
                    res.send("<div class = 'Ticker'>"+item.Ticker+"</div>");
                    res.send("<div class='Price'>" +item.Price + "</div></div>");
                                
                });
                res.end();

            } 
            catch(err) {
                console.log("Database error: " + err);
            }
            finally {
                client.close();
            }
            }  //end doit
            doit();
});

app.listen(port);
