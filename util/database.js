const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
let _db;

const mongoConnect=callback=>{
    mongoClient.connect('mongodb+srv://anempooja:anem123@cluster1.98k8f48.mongodb.net/shop?retryWrites=true&w=majority',function(){

    })
    .then(client=>{
        console.log('connected')
        _db=client.db()
        //console.log(_db)
        callback()
    })
    .catch(err=>{console.log(err)})
}

const getDb=()=>{
    if(_db){
      console.log(_db)
        return _db
    }
    
        throw 'database not found'
    
}

exports.mongoConnect=mongoConnect
exports.getDb=getDb
