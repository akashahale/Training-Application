const AWS = require('aws-sdk');
var iot = new AWS.Iot();
const s3 = new AWS.S3({signatureVersion: 'v4'});
const s3_bucket = 'training-app-akash'
const fs = require('fs');


async function uploadFile(formatedFile,fileName) {
    return new Promise((res,rej)=>{
   // console.log("in upload");
    const fileContent = fs.readFileSync(formatedFile);
    let params = { Body: fileContent, Bucket: s3_bucket, Key: fileName };
    s3.upload(
        params,
        function(err, data) {
          console.log(err, data);
          if(err) rej(err);
          else{
              console.log("data from upload file ",data);
              res(data);
          }
         
    });
  });
}


async function getS3URL(fileName){
    return new Promise((res,rej)=>{
        console.log("file name "+fileName);
        var params = {Bucket:s3_bucket,Key:fileName}
        var URL = s3.getSignedUrl('getObject',params); 
        res(URL);
    })
    
   
}


module.exports = {uploadFile ,  getS3URL }
