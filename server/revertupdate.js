const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "items";


exports.handler = (event, context, callback) => {

    var itemlist = {};
    itemlist.success = false;

    var flag = 0;
    for (let i = 0; i < event.items.length; i++) {

        var params = {
            TableName: tableName,
            Key: {
                "id": event.items[i].id
            }
        }
        let result = docClient.get(params).promise();

        result.then((res) => {
            console.log("Res: " + res.Item.itemname + " Quantity:" + res.Item.quantity);
            console.log("Obj: " + event.items[i].id + " Quantity:" + event.items[i].quantity);
            flag = flag + 1;
            var diff = Number(res.Item.quantity) + Number(event.items[i].quantity);
            var params1 = {
                TableName: tableName,
                Key: {
                    "id": event.items[i].id,
                },
                UpdateExpression: "set quantity=:q",
                ExpressionAttributeValues: {
                    ":q": diff
                }
            }

            let result1 = docClient.update(params1).promise();
            itemlist.success = true;
            callback(null, itemlist);

        }).catch((err) => {
            return err;
        })

    }

};