var nsv = require('neo4j-supervisor'),
    nvm = require('neo4j-vm'),
    seraph = require('seraph'),
    rand = require('randy').randInt,
    async = require('async'),
    fs = require('fs');

module.exports = function(opts, cb) {
  if (typeof opts == 'function') cb = opts;
  
  var version = opts.version || '1.9.M01';
  var edition = opts.edition || 'community';
  var port, _nsv;

  var getPort = function(cb) {
    fs.readFile(__dirname + '/neo4j.port', 'utf8', function(err, portstr) {
      port = !err && portstr ? parseInt(portstr, 10) : rand(20000, 60000);
      fs.writeFile(__dirname + '/neo4j.port', port, function(err) {
        cb(err);
      });
    });
  };

  var pass = function(ctx, fn, passed) {
    return function() {
      var args = [].slice.call(arguments);
      var cb = args.pop();
      args.push(function(err) { cb(err, !err && passed) });
      fn.apply(ctx, args);
    };
  };

  async.waterfall([
    getPort,
    function getNeoInstall(cb) { nvm(version, edition, cb) },
    function createSupervisor(loc, cb) { cb(null, _nsv = nsv(loc)) },
    function setPort(neo, cb) { pass(neo, neo.port, neo)(port, cb) },
    function start(neo, cb) { pass(neo, neo.start, neo)(cb) },
    function getEndpoint(neo, cb) { neo.endpoint(cb) },
    function createSeraph(ep, cb) { cb(null, seraph(ep), _nsv) }
  ], cb);
};
