var fs = require("fs");
            var request = require("request");
            var options = { method: 'POST',
              url: 'https://apigateway.tomnx.com/sf3api/ip/uploader/jobs',
              headers: 
               { 'cache-control': 'no-cache',
                 Connection: 'keep-alive',
                 'content-length': '5747',
                 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                 'accept-encoding': 'gzip, deflate',
                 Host: 'apigateway.tomnx.com',
                 'Postman-Token': '3af355cf-0973-470b-9e6a-0d18654d0b59,213490ed-8d6d-493f-af74-6ad8a6aa0113',
                 'Cache-Control': 'no-cache',
                 Accept: '*/*',
                 'User-Agent': 'PostmanRuntime/7.15.0',
                 ClientKey: '192a9085fcffafb598335fe4681db8a4',
                 APIKey: '5a00a2a9c13bf972212a41ea955d8b9b4578485eb45fa9d136819fc2' },
              formData: 
               { file: 
                  { value: 'fs.createReadStream("C:\TEST\TestJson2.JSON")',
                    options: { filename: 'TestJson2.JSON', contentType: null } } } };
            
            request(options, function (error, response, body) {
              //if (error) throw new Error(error);
            
              console.log(body);
            });