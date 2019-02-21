# node-rest-date
building a rest api for some memorable dates

# database
mongodb://tris:<PASSWORD>@node-rest-data-shard-00-00-bvbma.mongodb.net:27017,node-rest-data-shard-00-01-bvbma.mongodb.net:27017,node-rest-data-shard-00-02-bvbma.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-data-shard-0&authSource=admin&retryWrites=true

# APIs

## date
_id: mongoose.Schema.Types.ObjectId,
dateMDY: {type: String, required: true},
dayOfWeek: {type: String, required: true}

## event
_id: mongoose.Schema.Types.ObjectId,
date: {type: mongoose.Schema.Types.ObjectId, ref: 'Date', required: true },
mood: {type: String, required: true},
photo: {type: String, required: false}