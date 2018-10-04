var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: './web-static',            // required, the root of the server file tree
  port: 1337
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});