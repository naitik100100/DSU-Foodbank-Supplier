const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "items";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Item: {
            "id": event.id,
            "itemname": event.itemname,
            "quantity": event.quantity
        }
    };
    docClient.put(params, function (err, data) {
        callback(err, data);
    });
};