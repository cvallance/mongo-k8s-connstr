# mongo-k8s-connstr

Simple node module to provide a mongo connection string when using mongo in Kubernetes. It takes a set of kubernetes labels which is used to query the kubernetes api for matching pods.

## Environment Variables

The library depends on the following environment variables.

Name | Description | Example
---- | ----------- | -------
`LL_MONGO_URL` | If you want to set the mongo connection string manually | mongodb://127.0.0.1/shipping  
`LL_MONGO_POD_LABELS` | Pod labels used to select all the mongo servers, should be a comma separated list of key values | name:mongo,environment:dev  
`LL_MONGO_DBNAME` | Name of the database you want to connect to | shipping  
`LL_MONGO_REPLICASET` | Name of the mongo replicaset | rs0  
`LL_MONGO_REPLICASET_W` | Write concern value (defaults to '1') | majority  
`LL_MONGO_REPLICASET_READPREF` | Read preference value (defaults to 'primary') | primaryPreferred  

## How it works

If `LL_MONGO_URL` is set, no further manipulation is done and it is returned.

Otherwise it will check the kubernetes readonly API to return all the pods and then find the pods that match the supplied
pod labels.


## TODO

- handle if the mongo pods aren't up and assigned an IP yet
- tests
- filter the pods via the API