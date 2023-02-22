const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
let _db;

const mongoconnect=callback=>{
    mongoClient.connect('mongodb+srv://anempooja:anem123@cluster0.8zv81n8.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client=>{
        console.log('connected')
        _db=client.db
        callback()
    })
    .catch(err=>{console.log(err)})
}

const getdb=()=>{
    if(_db){
        return _db
    }
    else{
        throw 'database not found'
    }
}

exports.mongoconnect=mongoconnect
exports.getdb=getdb