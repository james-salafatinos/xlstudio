const express = require("express");
const port = 3000;
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

app.use(express.json());

app.get("/", function (request, response) {
  app.use("/public", express.static("./src/public"));
  app.use("/static", express.static("./src/static"));
  app.use("/modules", express.static("./src/modules"));
  app.use("/utils", express.static("./src/utils"));
  app.use("/data", express.static("./src/data"));
  response.sendFile(__dirname + "/src/views/index.html");
});

const uri =
  "mongodb+srv://jamessalafatinos:1EyZviyBt22h4LoZ@cluster0.hmourqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {});

async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
  }
}
connectMongo();

app.post('/saveProjectData/:projectName', async (req, res) => {
  const { projectName } = req.params;
  const { objectivesData, metricsData } = req.body;

  const collection = client.db("projectDB").collection("projectData");

  try {
    const result = await collection.updateOne(
      { projectName },
      { $set: { objectivesData, metricsData } },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      res.status(201).json({ message: 'New project created successfully.' });
    } else if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Project updated successfully.' });
    } else {
      res.status(200).json({ message: 'No changes made to the project.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error saving or updating data' });
  }
});

app.get('/loadProjectData/:projectName', async (req, res) => {
  const { projectName } = req.params;
  const collection = client.db("projectDB").collection("projectData");

  try {
    const projectData = await collection.findOne({ projectName });
    if (projectData) {
      res.status(200).json(projectData);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error loading data' });
  }
});

var server = app.listen(process.env.PORT || port, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://" + host + ":" + port);
  console.log("App listening at http://localhost:" + port);
}
