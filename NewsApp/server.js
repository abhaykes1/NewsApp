var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var url = 'https://newsapi.org/v2/';
var apiKey = 'bab8cb2ecf584c45af4617a426de4294';
var jsonParser = bodyParser.json();
var urlencodedPaser = bodyParser.urlencoded({extended: false});
app.get('/',function(req,res){
    res.render('home.ejs');
});
app.post('/', urlencodedPaser, function(req,res){
    var result = req.body.what;
    console.log(result);
    res.redirect('/search/'+result+"/1");
});
app.get('/:headlines/:page',function(req,res){
    request(url+'top-headlines'+'?country='+'in&'+"category="+req.params.headlines+"&page="+req.params.page
    +'&apiKey='+apiKey,(error, response, body)=>{
        //console.log(body);
        var endpoint = '/'+req.params.headlines+'/';
        body = JSON.parse(body);
        res.render('showJSON.ejs',{content:body,content2:endpoint});
    });
});
app.get('/search/:query/:page',function(req,res){
    request(url+'everything?q='+req.params.query+"&page="+req.params.page+'&apiKey='+apiKey,function(error,response,body){
        body = JSON.parse(body);
        var endpoint = '/search/'+req.params.query+'/';
        res.render('showJSON.ejs',{content:body,content2:endpoint});
    });
});
app.listen(8080);