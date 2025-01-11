const AWS = require('aws-sdk');
const fs = require('fs'); // Import the fs module
require('dotenv').config();

// Configure AWS with credentials
AWS.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: process.env.aws_region, // Specify your AWS region
});

// Create a Rekognition client
const rekognition = new AWS.Rekognition();

// Function to convert image to byte data
const getImageBytes = (filePath) => {
    try {
        const fileData = fs.readFileSync(filePath); // Read file as buffer
        return fileData;
    } catch (err) {
        console.error(`Error reading image file at ${filePath}:`, err);
        throw err;
    }
};

// Parameters for compareFaces
const imagePath1 = `${__dirname}/images/series-sanat.jpg`;
const imagePath2 = `${__dirname}/images/sanat-qutub.jpg`;

const params = {
    SourceImage: { Bytes: getImageBytes(imagePath1) },
    TargetImage: { Bytes: getImageBytes(imagePath2) },
    SimilarityThreshold: 90,
};

// Call compareFaces
rekognition.compareFaces(params, (err, data) => {
    if (err) {
        console.error('Error comparing faces:', err);
    } else {
        console.log('Face comparison result:', JSON.stringify(data, null, 2));
    }
});

// Verify credentials
AWS.config.getCredentials(function (err) {
    if (err) console.error('Error loading credentials:', err.stack);
    else {
        console.log(
            'Access key:', AWS.config.credentials.accessKeyId,
            'AWS secret:', AWS.config.credentials.secretAccessKey
        );
    }
});
