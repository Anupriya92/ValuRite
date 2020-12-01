var http = require("http");
var express = require('express');
var mongodb = require('mongodb');
var fs = require('fs');

fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody = req.body;
          /*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: " + strBody);
			console.log(strBody.fname)
	      var name=strBody.fname;
		  var file='C:/inetpub/wwwroot/Data/'+name+'.jpg';
		  fs.readFile(file, function(err, original_data){
               var base64Image = new Buffer(original_data, 'binary').toString('base64');
			   res.send(base64Image);
		  });
        //});
		   
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;