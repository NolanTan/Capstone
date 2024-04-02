/**
 * This backend uses Express.js (web application framework for Node.js) to define routes for
 * handling the sending and retrieval of data to the MongoDB database.
 * 
 * @author Nolan Flinchum
 * @version 2/14/2024
 */

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require('cors');

// Create MongoDB client using MongoDB connection URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const PORT = process.env.PORT || 3001; 
const app = express(); // Instantiate Express application
app.use(cors()); // Middleware - CORS
app.use(express.json()); // Middleware - parse JSON data from incoming requests

/**
 * GET endpoint to retrieve data from MongoDB.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
app.get("/", async (req, res) => {
  try {
    const collection = client.db('lsm-tree-schedules').collection('scripts');
    const data = (await collection.find({}, {projection: {_id: 0}}).toArray());
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * POST endpoint to save data to MongoDB.
 * @param {Request} req - The request object containing data.
 * @param {Response} res - The response object.
 */
app.post("/saveData", async (req, res) => {
  const {value1, value2} = req.body;

  try {
    const collection = client.db('lsm-tree-schedules').collection('scripts');
    const newDocument = {name: value1, text: value2}; // Create document w/ frontend values
    await collection.insertOne(newDocument); // Insert document into database

    console.log('Data saved:', value1);
    res.status(200).json({message: 'Data saved!'})
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Error saving data'});
  }
})

/**
 * DELETE endpoint to delete data from MongoDB.
 * 
 * @param {Request} req - The request object containing data.
 * @param {Response} res - The response object.
 */
app.delete("/deleteData/:name", async (req, res) => {
  const scriptName = req.params.name; // Extract script name from URL parameter

  try {
    const collection = client.db('lsm-tree-schedules').collection('scripts');
    await collection.deleteOne({name: scriptName});

    console.log('Data deleted:', scriptName);
    res.status(200).json({message: 'Data deleted!'});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Error deleting data'});
  }
})

/**
 * Start Express server and listen on specified port.
 */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});