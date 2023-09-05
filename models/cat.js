const client = require("../dbConnection")

let collection = client.db().collection('Cats');

function postCat(data, callback) {
    collection.insertOne(data, callback)
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);   
}

function deleteOne(id, callback) {
    collection.deleteOne({_id: id}, callback);
}

module.exports = {postCat, getAllCats, deleteOne}