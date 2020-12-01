var http = require("http");
var fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var XlsxTemplate = require('xlsx-template');
		
        fs.readFile('D:\\23-02-2017\\RouterCode Local\\routes\\test-tables.xlsx', function(err, data) {

            // Create a template
            var template = new XlsxTemplate(data);

            // Replacements take place on first sheet
            var sheetNumber = 1;

            // Set up some placeholder values matching the placeholders in the template
            var values = {
                extractDate: "Vijay",
                dates: [new Date("2013-06-01"), new Date("2013-06-02"), new Date("2013-06-03")],
                people: [{
                        name: "John Smith",
                        age: 20
                    },
                    {
                        name: "Bob Johnson",
                        age: 22
                    }
                ]
            };

            // Perform substitution
            template.substitute(sheetNumber, values);

            // Get binary data
            var data = template.generate({type: 'nodebuffer'});
			
			
			fs.writeFile("NEwxls.xlsx", data, function(err) {
				if(err) {
					return console.log(err);
				}
				else{
					console.log("The file was saved!");
					res.send("1")
				}
			}); 
						

        });
    } catch (Ex) {
        console.log("ex" + Ex.message);
    }
});
module.exports = router;