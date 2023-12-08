var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = "mongodb+srv://pavomare:PavoMare17@cluster0.5phcbau.mongodb.net/?retryWrites=true&w=majority";



function find (queryArray) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.log(err); }

        var dbo = db.db("HW14");
        var collection = dbo.collection('Companies');

        //runQuery(collection, data);

            PSEUDOCODE
        if queryChoice.value = 'symbol' {
            db.--.find(symbol = queryChoice.value)    should display all results
        }
        if queryChoice.value = 'coName' {
            db.--.find(company = queryChoice.value)   should display all results
        }
        
    });

}


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    urlObj = url.parse(req.url,true)
    path = urlObj.pathname;
    if (path == "/")
    {
      file="form.html";
      fs.readFile(file, function(err, home) {
      res.write(home);
      res.end();
      })
    }
    else if (path == "/process")
    {
      var body = '';
      req.on('data', chunk => { body += chunk.toString();  });
      req.on('end', () => 
          { 
          res.write ("Raw data string: " + body +"<br/>");
          var queryArray= qs.parse(body);
          console.log(queryArray['queryChoice']);
          if (queryArray['queryChoice'] == 'symbol') {
            console.log("symbol!!");
          } else if (queryArray['queryChoice'] == 'coName') {
            console.log("coName!!");
          } else {
            console.log("unidentified queryChoice");
          }
          //var radioChoice = body.split('=');
          var id = queryArray['textInput']
          console.log(queryArray);

          //find(queryArray);
          });
    }
}).listen(8080);
    
/*var body = '';
req.on('data', chunk => { body += chunk.toString(); });
req.on('end', () =>
{
console.log(qs.parse(body).x ); // assume x is post data parameter
res.end();
});*/

function runQuery(collection, data) {
    theQuery = {author:"Bob Smith"};
    coll.find(theQuery).toArray(function(err, items) {
    if (err) {
    console.log("Error: " + err);
    }
    else
    {
    console.log("Items: ");
    for (i=0; i<items.length; i++)
    console.log(i + ": " + items[i].title + " by: " + items[i].author);
    }
    db.close();

    });
}

/*MongoClient.connect(url, function(err, db) {
    if(err) { return console.log(err); }

    var dbo = db.db("HW14");
    var collection = dbo.collection('Companies');

    //runQuery(collection, data);

     PSEUDOCODE
    if queryChoice.value = 'symbol' {
        db.--.find(symbol = queryChoice.value)    should display all results
    }
    if queryChoice.value = 'coName' {
        db.--.find(company = queryChoice.value)   should display all results
    }
    
});*/