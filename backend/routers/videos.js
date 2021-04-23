const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const documentClient = new AWS.DynamoDB.DocumentClient();


router.get('/floormat/:timestable/:difficulty', async (req, res) => {
    const s3 = new AWS.s3();
        const params = {
            Bucket: 'ucl-tt-videos',
            Key: '10x-adv-floor-mat.m4v'
        }

        try {
            response = await s3.getOject(params).promise
        console.log(promise)
            res.status(200).json({
            message: "You have retrieved your videos ",
            success: true,
            response
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Videos could not be retrieved',
                success: false});
        }

    
})
router.get('/nofloormat/:timestable/:difficulty', async (req, res) => {
    const s3 = new aws.S3();
    try {
        const response = await s3.listObjectsV2({
            Bucket: 'ucl-tt-videos',
            Prefix: 'No-FLoor-Mat', 
        }).promise();
        console.log(response)
        res.status(200).json({
            message: "You have retrieved your videos ",
            success: true,
            response
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Videos could not be retrieved',
                success: false});
        }

    
})

module.exports=router;
