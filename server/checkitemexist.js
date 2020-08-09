const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "items";


exports.handler = (event, context, callback) => {

    var itemlist = {};
    itemlist.success = false;
    itemlist.items = new Array();

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
            if (res.Item.quantity < event.items[i].quantity) {
                itemlist.items.push({
                    "itemname": res.Item.itemname,
                    "id": res.Item.id,
                    "quantity": res.Item.quantity
                });
            }

            if (flag == event.items.length) {
                console.log(flag);
                if (itemlist.items.length == 0) {
                    itemlist.success = true;
                    callback(null, itemlist);
                } else {
                    itemlist.success = false;
                    callback(null, itemlist);
                }
            }

        }).catch((err) => {
            return err;
        })

    }

};