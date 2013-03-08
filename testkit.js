var nsv = require('neo4j-supervisor'),
    nvm = require('neo4j-vm'),
    seraph = require('seraph'),
    rand = require('randy').randInt,
    async = require('async'),
    naan = require('naan');

module.exports = function(opts, cb) {
  if (typeof opts == 'function') cb = opts;
  
  var version = opts.version || '1.9.M05';
  var edition = opts.edition || 'community';
  var port = opts.port || rand(20000, 60000);

  async.waterfall([
    function getNeoInstall(cb) { nvm(version, edition, cb) },
    function createSupervisor(loc, cb) { cb(null, nsv(loc)) },
    function setPort(neo, cb) { naan.b.wrap(neo, neo.port, neo)(port, cb) },
    function start(neo, cb) { naan.b.wrap(neo, neo.start, neo)(cb) },
    function getEndpoint(neo, cb) { neo.endpoint(cb) },
    function createSeraph(ep, cb) { cb(null, seraph(ep)) }
  ], cb);
};
