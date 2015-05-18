var getMongoPodLabels = function() {
  return process.env.LL_MONGO_POD_LABELS || false;
};

var getMongoPodLabelCollection = function() {
  var podLabels = getMongoPodLabels();
  if (!podLabels) {
    return false;
  }

  var labels = process.env.LL_MONGO_POD_LABELS.split(',');
  for (var i in labels) {
    var keyAndValue = labels[i].split('=');
    labels[i] = {
      key: keyAndValue[0],
      value: keyAndValue[1]
    };
  }

  return labels;
};

var getKubernetesROServiceAddress = function() {
  return process.env.KUBERNETES_RO_SERVICE_HOST + ":" + process.env.KUBERNETES_RO_SERVICE_PORT
};

module.exports = {
  mongoUrl: process.env.LL_MONGO_URL || false,
  mongoDbName: process.env.LL_MONGO_DBNAME || false,
  mongoReplicaSet: process.env.LL_MONGO_REPLICASET || false,
  mongoReplicaSetW: process.env.LL_MONGO_REPLICASET_W || '1',
  mongoReplicaSetReadPref: process.env.LL_MONGO_REPLICASET_READPREF || 'primary',
  mongoPodLabels: getMongoPodLabels(),
  mongoPodLabelCollection: getMongoPodLabelCollection(),
  kubernetesROServiceAddress: getKubernetesROServiceAddress()
};
