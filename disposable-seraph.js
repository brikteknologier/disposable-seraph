var nsv = require('neo4j-supervisor'),
    nvm = require('neo4j-vm'),
    seraph = require('seraph'),
    rand = require('randy').randInt,
    async = require('async'),
    naan = require('naan'),
    fs = require('fs');

module.exports = function(opts, cb) {
  if (typeof opts == 'function') cb = opts;
  
  var version = opts.version || '1.9.M05';
  var edition = opts.edition || 'community';
  var port, _nsv;

  var getPort = function(cb) {
    fs.readFile(__dirname + '/neo4j.port', 'utf8', function(err, portstr) {
      port = !err && portstr ? parseInt(portstr, 10) : rand(20000, 60000);
      fs.writeFile(__dirname + '/neo4j.port', 'utf8', function(err) {
        cb(err);
      });
    });
  };

  async.waterfall([
    getPort,
    function getNeoInstall(cb) { nvm(version, edition, cb) },
    function createSupervisor(loc, cb) { cb(null, _nsv = nsv(loc)) },
    function setPort(neo, cb) { naan.b.wrap(neo, neo.port, neo)(port, cb) },
    function start(neo, cb) { naan.b.wrap(neo, neo.start, neo)(cb) },
    function getEndpoint(neo, cb) { neo.endpoint(cb) },
    function createSeraph(ep, cb) { cb(null, seraph(ep), _nsv) }
  ], cb);
};
