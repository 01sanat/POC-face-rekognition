var AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", process.env.aws_access_key_id, "AWS secret:", process.env.aws_secret_access_key);
    }
});