var config = require('./config');
var format = require('util').format;
var k8s = require('./k8s');

var get = function(done) {
  var mongoUrl = config.mongoUrl;
  if (mongoUrl) {
    return done(null, mongoUrl);
  }

  k8s.getMongoPods(function(err, pods) {
    if (err) {
      return done(err);
    }

    if (!pods.length) {
      var errMsg = 'Failed to find any matching pods. LL_MONGO_POD_LABELS: ' + config.mongoPodLabels;
      return done(new Error(errMsg));
    }

    var podIps = [];
    for (var i in pods) {
      //NOTE: We might error out if this pod is up before the mongo pods.
      podIps.push(pods[i].status.podIP);
    }

    mongoUrl = format('mongodb://%s/', podIps.join(','));

    if (config.mongoDbName) {
      mongoUrl += config.mongoDbName;
    }

    if (config.mongoReplicaSet) {
      mongoUrl += format('?replicaSet=%s&w=%s&readPreference=%s',
        config.mongoReplicaSet,
        config.mongoReplicaSetW,
        config.mongoReplicaSetReadPref
      );
    }

    done(null, mongoUrl);
  });
};

module.exports = {
  get: get
};