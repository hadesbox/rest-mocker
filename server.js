var Handlebars = require("handlebars");
var Chance = require('chance');
var glob = require("glob");
var restify = require('restify');
var fs = require("fs");
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.jsonp());

require('./helpers.js').init(Handlebars, Chance);

function respondRequest(req, res, next) {
    url = req["url"];
    // we remove the the dynamic params from URL path
    // and change them with static file paths of the template
    for(var par in req["params"]){
        url = url.replace(req["params"][par],":"+par)
    }
    //load and parse the json template
    var fileContent = fs.readFileSync('./www'+url);
    template = Handlebars.compile(""+fileContent);
    try{
        //var result = template(data);
        res.set('Content-Type', 'text/plain');
        try{
            //var data = { "restpath" : "https://docs.google.com/...", "name": "Alan" }
            //outputString = JSON.parse(template(data))
            outputString = JSON.parse(template())
            res.send(JSON.stringify(outputString, null, 2));
        }
        catch(ex){
            res.send("Invalid JSON, "+ex);
        }
    }
    catch(ex){
        res.send("Invalid Handlebars Template. "+ex)
    }
}

glob("www/**/*.json", function (er, files) {
    // rather than initializing static REST paths, we list template files
    // in www and initialize a service for each template found. 
    console.log(files);
    for(var key in files){
        server.get('/'+files[key].substring(3), respondRequest);
        console.log("creating service",files[key].substring(3))
    }
    server.listen(8081, function() {
      console.log('%s listening at %s', server.name, server.url);
    }); 
})