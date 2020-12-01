var http = require("http");
var express = require('express');
var express = require('mongodb');
var moment = require('moment');
var fs = require('fs');
var url1=require('url');
var request = require('request');
var exec = require('child_process').execFile;
var ImageModule=require('docxtemplater-image-module')

//get current date
var d = new Date();
var datetime = moment().format('DD-MM-YYYY');

		var jsonobjPDF={};
		

 
		var opts = {}
		
		opts.centered = false;
		opts.getImage=function(tagValue, tagName) {
			return fs.readFileSync(tagValue,'binary');
		}
		 
		opts.getSize=function(img,tagValue, tagName) {
			return [150,150];
		}
		 
		var imageModule=new ImageModule(opts);
		 
		var Docxtemplater = require('docxtemplater');
		var JSZip = require('jszip');

		var content = fs
			.readFileSync("test.docx","binary");
		 
		 var data = {"data":[{image:'http://182.72.100.214/Data/PropImage1.jpg'},
					 {image:'http://182.72.100.214/Data/PropImage1.jpg'},
					 {image:'http://182.72.100.214/Data/PropImage1.jpg'}]}
					 
					 console.log(JSON.stringify(data.data))
		 
		var zip = new JSZip(content);
		var docx=new Docxtemplater()
			.attachModule(imageModule)
			.loadZip(zip)
			.setData(data)
			.render();
		 
		var buffer= docx
				.getZip()
				.generate({type:"nodebuffer"});
		 
		fs.writeFile("test.docx",buffer);		