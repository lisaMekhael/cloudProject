import express, { request, response } from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Book Shop");
});

app.use("/books", booksRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App connected to db");
//     app.listen(PORT, () => {
//       console.log(`App listening on port ${PORT}!`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });


import AWS from 'aws-sdk';
import aks from './config.js';


// Set the region and access keys
AWS.config.update({
region: aks.region,
accessKeyId: aks.accessKeyId,
secretAccessKey: aks.secretAccessKey
});

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
  TableName : 'Books',
  Item:{
    id:'101',
    title:"The Catcher",
    description: "This is a classic novel",
    authour : "Henry L. Nail",
    publishYear: '1999',
    //S3 URL
    coverPhotoUrl : "https://cloudproject66.s3.eu-north-1.amazonaws.com/Catcher+Book.jpeg" 
  }

}, (err,data)=>{
  if(!err){
    console.log("Data inserted Successfully!" , data);
}else{
  console.log("Error inserting data into database" , err);
}

})