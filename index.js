const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// facebookLogin
// utW5mBmL3XbZblj2

app.get("/", (req, res) => {
  res.send("facebook login page is running on server");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://facebookLogin:utW5mBmL3XbZblj2@cluster0.rxkguw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const loginUserCollection = client.db("loginUserDb").collection("users");

    app.post("/login", async (req, res) => {
      const data = req.body;
      const result = await loginUserCollection.insertOne(data);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Facebook login is running on port ${port}`);
});
