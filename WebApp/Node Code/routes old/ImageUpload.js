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
			
			
			var jsonObj = strBody;
			var ValuationID = jsonObj.ValuationID;
			var image = jsonObj.image;
			var name = jsonObj.name;
			

           // function to create file from base64 encoded string
            function base64_decode(base64str, file) {
              // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
               var bitmap = new Buffer(base64str, 'base64');
             // write buffer to file
               fs.writeFileSync(file, bitmap);
					console.log('******** File created from base64 encoded string ********');
                }


               // convert base64 string back to image 
			       var file='C:/inetpub/wwwroot/Data/'+name+'.jpg';
                      base64_decode(image, file);
		  //});
		   res.send("1");
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;