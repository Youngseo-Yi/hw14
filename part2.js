var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://pavomare:PavoMare17@cluster0.5phcbau.mongodb.net/?retryWrites=true&w=majority";



/*function addOne (collection) {

    var myFile = readline.createInterface({
        input: fs.createReadStream('companies.csv')
    });

    myFile.on('line', function (line) {
   
        var newString = line;
        documentItems = newString.split(',');
        var newData = {"Company": documentItems[0], "Ticker": documentItems[1], "Price": documentItems[2]};
        if (documentItems[0]!= "Company") {
            collection.insertOne(newData, function(err, res) {
                if (err) { return console.log(err); }
                console.log("new document inserted");
            });
        }
    });

}*/

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var qobj = url.parse(req.url, true).query;
    if ( req.url == "/part2.js") {
        console.log ("Successful");
    } else {
        console.log ("Not Successful");
    }
    var txt = qobj.x;
    res.end(txt);
})
    
//.listen(8080);

var body = '';
req.on('data', chunk => { body += chunk.toString(); });
req.on('end', () =>
{
console.log(qs.parse(body).x ); // assume x is post data parameter
res.end();
});

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