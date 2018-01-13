require('dotenv').config()
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'eu-west-1'
});


exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)

  if (event.headers['key'] !== process.env.SECRET_KEY) {
    callback(null, {
      statusCode: 403
    })
  }

  const message = {
    "ts": {
      S: body.message.ts
    },
    "User": {
      S: body.message.user
    },
    "Text": {
      S: body.message.text
    },
    "Channel": {
      S: body.message.channel
    },
    "Name": {
      S: body.displayName
    }
  }

  dynamodb.putItem({
    Item: message,
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.TABLE_NAME
  }, function (err, data) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err)
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    }
  });
}