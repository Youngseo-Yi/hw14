var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = "mongodb+srv://pavomare:PavoMare17@cluster0.5phcbau.mongodb.net/?retryWrites=true&w=majority";



function findResults (queryArray) {

    client = new MongoClient(url);
    async function doit() {
    try {
        await client.connect();
        var dbo = client.db("HW14");
        var coll = dbo.collection('Companies');
        const options = {
        projection: { _id: 0, Company: 1, Ticker: 1, Price:1},
        };

        if (queryArray['queryChoice'] =='coName') {
            myQuery = {Company: queryArray['textInput']};
        } else {
            myQuery = {Ticker: queryArray['textInput']};
        }
        const curs = coll.find(myQuery,options);
        // print a message if no documents were found
        if ((await curs.count()) === 0) {
        console.log("No documents found!");
        }
        
        await curs.forEach(function(item){
            console.log(item.Company);
        });
    } 
    catch(err) {
        console.log("Database error: " + err);
    }
    finally {
        client.close();
    }
    }  //end doit
    doit();//.catch(console.dir);      

}


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    urlObj = url.parse(req.url,true)
    path = urlObj.pathname;
    if (path == "/") {
      file="form.html";
      fs.readFile(file, function(err, home) {
      res.write(home);
      res.end();
      })
    }
    else if (path == "/process") {
      var body = '';
      req.on('data', chunk => { body += chunk.toString();  });
      req.on('end', () => 
          { 
          res.write ("Raw data string: " + body +"<br/>");
          var queryArray= qs.parse(body);
          console.log(queryArray['queryChoice']);
          findResults(queryArray);
          });
    }
}).listen(8080);