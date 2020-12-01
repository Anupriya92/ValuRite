var MyModule = function(){};
var fs = require("fs")
MyModule.prototype.fnuserlog=function(content)
		{
			var Currentdate=new Date();
			var months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
			Currentdate=Currentdate.getDate()+"-"+months[Currentdate.getMonth()]+"-"+Currentdate.getFullYear();
			//console.log("This is a function");
			data=content;
			var filepath='C:/inetpub/wwwroot/Data/LogFile/'+Currentdate+'.txt';
			fs.stat(filepath, function(err, stat) {
				if(err == null) {
					console.log('File exists');
					fs.appendFile(filepath, data, function(error) {
						if (error) {
							console.error("write error:  " + error.message);
						}
						else
						{
							console.log("Successful Write to " + filepath);
						}
					});	
				} 
				else if(err.code == 'ENOENT') {
					fs.writeFile(filepath, data);
					console.log("Successful Write to " + filepath);
				}
				else 
				{
				console.log('Some other error: ', err.code);
				}
			});
		}
module.exports = MyModule;