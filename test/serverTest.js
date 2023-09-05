const { expect } = require("chai");
request = require("request");
const catModel = require('../models/cat');
const { ObjectId } = require('mongodb');

const url = 'http://localhost:3001/api/cats';
let cat = {
    title: '',
    subTitle: '',
    path: '',
    description: ''
}

let insertedId = '';

describe("Test GET API", function () {
    it('GET call to get all cats', function (done) {
        try {
            request(url, function (error, responce, dataString) {
                const dataObj = typeof (dataString) == 'string' ? JSON.parse(dataString) : '';
                expect(dataObj.statusCode).equal(200);
                expect(dataObj.data).to.be.a('array');
                done();
            })
        } catch (error) {
            console.error("Error while requesting data: ", error);
        }
    });
});

describe("Test POST API", function () {
    it('POST call to add cat data', function (done) {
        try {
            request.post({ url, cat }, function (error, responce, dataString) {
                const dataObj = typeof (dataString) == 'string' ? JSON.parse(dataString) : '';
                console.log({ dataObj });
                expect(dataObj.statusCode).equal(201);
                expect(dataObj.data.insertedId).to.be.a('string');
                insertedId = new ObjectId(dataObj.data.insertedId) // Store the insertedId for rollback
                done();
            })
        } catch (error) {
            console.error("Error while posting data: ", error);
        }
    });
    
    afterEach(function() {
        if (insertedId) {
            try {
                catModel.deleteOne({ _id: new ObjectId(insertedId) }, function(error, data) {
                });
                console.log("Rollback: Deleted inserted data.", result);
            } catch (error) {
                console.error("Error during rollback: ", error);
            }
        }
    });
    
});