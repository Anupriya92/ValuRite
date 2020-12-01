var MyModule = function(){};
var fs = require("fs")
var timediff = require('timediff');

MyModule.prototype.fnuserlog=function(content)
		{
			var Currentdate=new Date();
			var months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
			Currentdate=Currentdate.getDate()+"-"+months[Currentdate.getMonth()]+"-"+Currentdate.getFullYear();
			//console.log("This is a function");
			data=content;
			var filepath='C:/inetpub/wwwroot/Data/GOBIOM/'+Currentdate+'.txt';
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
MyModule.prototype.memorySizeOf=function (obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if(objClass === 'Object' || objClass === 'Array') {
                    for(var key in obj) {
                        if(!obj.hasOwnProperty(key)) continue;
                        sizeOf(obj[key]);
                    }
                } else bytes += obj.toString().length * 2;
                break;
            }
        }
        return bytes;
    };

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
};

MyModule.prototype.getTimeDiff = function(start,end)
{ 
	return JSON.stringify(timediff('2015-01-01', '2018-05-02 02:15:10.777', 'YDHms'));
}
		
module.exports = MyModule;