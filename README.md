rest-mocker
===========

A REST mock service that generates random data with chacesjs.

You define the templates on the www folder, depefing on the folder tree a GET service will be created.


Installation & run
==================

just ```npm install``` and start the server with ```node server.js```


Hacking it!
===========

This is more a start app, than a full npm module... the idea is that you can just drop JSONs inside the WWW folder, and they will be mapped by express as rest services. Currently only GETs are published... you can use any function from changes.js on the handlebars template if you use the ```"{{chance 'email'}}"```. You can implement custom function on the helpers.js file.


On future implementation depending on the filename ```www/get.resource.json``` will publish a GET service on the root (GET to /resource), ```www/post.resource.json.``` will publish a post service on the root (POST to /resource), it will be published as a GET.

If you define a ":resource" folder or filename, that will become a URI Parameter that express will publish (i.e. /users/:userid will publish a GET service that can be consumed as /users/122626 /users/377 etc).


