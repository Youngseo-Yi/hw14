var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = "mongodb+srv://pavomare:PavoMare17@cluster0.5phcbau.mongodb.net/?retryWrites=true&w=majority";
var port =process.env.PORT || 3000
//var port=8080; uncomment to run local

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link rel="stylsheet" type="text/css" href="formStylesheet.css">');

    urlObj = url.parse(req.url,true)
    path = urlObj.pathname;
    if (path == "/") {
      file="form.html";
      fs.readFile(file, function(err, home) {
      res.write(home);
      res.end();

      })
    }
    else if (path == "/process") { //check if form has been submitted
        var body = '';
        req.on('data', chunk => { body += chunk.toString();  });
        req.on('end', () => { 
            var queryArray= qs.parse(body); //get the form data

            //Connect to MongoDB and find the query
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
                if (queryArray['queryChoice'] =='coName') {
                    myQuery = { Company: { $regex: queryArray['textInput']} }
                } else {
                    myQuery = { Ticker: { $regex: queryArray['textInput']} }
                }
                const curs = coll.find(myQuery,options);
                // print a message if no documents were found
                if ((await curs.count()) === 0) {
                    console.log("No documents found!");
                }
                //write in page for the results
                await curs.forEach(function(item){
                    res.write("<div class='myCo'>");
                    res.write("<div class='Company'>"+ item.Company+"</div>");
                    res.write("<div class = 'Ticker'>"+item.Ticker+"</div>");
                    res.write("<div class='Price'>" +item.Price + "</div></div>");
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
            //.catch(console.dir);   
        });
    }

}).listen(port);