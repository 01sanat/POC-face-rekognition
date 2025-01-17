const AWS = require('aws-sdk');
const fs = require('fs'); // Import the fs module
require('dotenv').config();
var path = require("path");

// Configure AWS with credentials
AWS.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: process.env.aws_region, // Specify your AWS region
});


// working with s3
// create s3 client
const s3 = new AWS.S3();

// s3.listBuckets(function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.Buckets);
//     }
// });

// create bucket with name
// const params = {
//     Bucket: "sanat-fk",
// }
// s3.createBucket(params, (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success");
//     }

// })

// const filePath = `${__dirname}/images/series-sanat.jpg`;
// const filePath2 = `${__dirname}/images/sanat-qutub.jpg`;
// const fileStream = fs.createReadStream(filePath2);

// fileStream.on('error', (err) => {
//     if (err) {
//         console.log('ee ta fatt giyo')
//     }
// })

// // fileStream.on('data', (chunk) => {
// //     console.log(' ', chunk, ' ')
// // })

// // upload File to s3
// const uploadParams = {
//     Bucket: "sanat-fk",
//     Key: 'images/' + path.basename(filePath2),
//     Body: fileStream
// }

// s3.upload(uploadParams, (err, data) => {
//     if (err) {
//         console.log("err in uploading to AWS", err);
//     } else {
//         console.log("success")
//     }
// })


// // Create a Rekognition client
const rekognition = new AWS.Rekognition();

// // Function to convert image to byte data
const getImageBytes = (filePath) => {
    try {
        const fileData = fs.readFileSync(filePath); // Read file as buffer
        return fileData;
    } catch (err) {
        console.error(`Error reading image file at ${filePath}: `, err);
        throw err;
    }
};

// // Parameters for compareFaces
// const imagePath1 = `${ __dirname } / images / series - sanat.jpg`;
const imagePath2 = `${__dirname}/images/vidhu.jpg`;

// const params = {
//     SourceImage: { Bytes: getImageBytes(imagePath1) },
//     TargetImage: { Bytes: getImageBytes(imagePath2) },
//     SimilarityThreshold: 90,
// };

const params2 = {
    SourceImage: {
        S3Object: {
            Bucket: "sanat-fk",
            Name: "images/series-sanat.jpg"
        }
    },
    TargetImage: {
        // S3Object: {
        //     Bucket: "sanat-fk",
        //     Name: "images/sanat-qutub.jpg"
        // }
        Bytes: getImageBytes(imagePath2)
    },
    SimilarityThreshold: 90,
}

// Call compareFaces
rekognition.compareFaces(params2, (err, data) => {
    if (err) {
        console.error('Error comparing faces:', err);
    } else {
        if (data?.FaceMatches[0]?.Similarity) {
            console.log('same user face matched , similarity : ', data?.FaceMatches[0]?.Similarity)
        } else {
            console.log('----differen person--- Not Matched', JSON.stringify(data, null, 2));
        }
    }
});

// Verify credentials
// AWS.config.getCredentials(function (err) {
//     if (err) console.error('Error loading credentials:', err.stack);
//     else {
//         console.log(
//             'Access key:', AWS.config.credentials.accessKeyId,
//             'AWS secret:', AWS.config.credentials.secretAccessKey
//         );
//     }
// });





