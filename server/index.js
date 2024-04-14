const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { response } = require("express");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const fileUpload = require("express-fileupload");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://yashwanth:yashwanth@cluster0.njk8mdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// console.log(uri)
async function run() {
  try {
    await client.connect();
    console.log("connected to db");

    const database = client.db("SmartCare");
    const doctorsCollection = database.collection("doctors");
    const AppointmentsCollection = database.collection("Appointments");
    const adminCollection = database.collection("admins");

    app.post("/login", async (req, res) => {
      const email = req.body.email;
      const pass = req.body.password;
      // console.log(req.body);
      const cursor = adminCollection.find({ email: email });
      const users = await cursor.toArray();
      if (users.length === 0) {
        res.json({
          error: "Email is not registered. Please enter a valid email!!",
        });
        return;
      } else {
        const admin = users[0];
        if (admin.password === pass) {
          res.json({ successful: "You have logged in successfully" });
        } else {
          res.json({ error: "Please enter correct password!!" });
        }
      }
    });

    app.get("/doctors", async (req, res) => {
      const cursor = doctorsCollection.find({});
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    // get all apprved doctors
    app.get("/approvedDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "true" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    // get all pending doctors
    app.get("/pendingDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "false" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    // delete doctor
    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await doctorsCollection.deleteOne(query);
      res.json(result);
    });
    // approve doctor
    app.put("/approve/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // make approved true
      const result = doctorsCollection.updateOne(query, {
        $set: { approved: "true" },
      });
      res.json(result);
    });
    // get doctor by email
    app.get("/doctors/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = doctorsCollection.find({ email });
      const doctor = await cursor.toArray();
      res.json(doctor);
    });

    app.post("/appoinments", async (req, res) => {
      const appointment = req.body;
      const result = await AppointmentsCollection.insertOne(appointment);
      res.json(result);
    });
    app.get("/appointments", async (req, res) => {
      const cursor = AppointmentsCollection.find({});
      const appointments = await cursor.toArray();
      res.json(appointments);
    });

    app.post("/doctors", async (req, res) => {
      // console.log('files', req.files)
      const doctor = req.body;
      // add image buffer
      const pic = req.files.image[0];
      const picData = pic.data;
      const encodedPic = picData.toString("base64");
      const imageBuffer = Buffer.from(encodedPic, "base64");
      doctor.image = imageBuffer;
      const result = await doctorsCollection.insertOne(doctor);
      res.json(result);
    });

    // get patient by id
    app.get("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await AppointmentsCollection.findOne(query);
      res.json(result);
    });
    // delete by id
    app.delete("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await AppointmentsCollection.deleteOne(query);
      res.json(result);
    });

    // app.put('/doctors/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const updateDoc = { $set: req.body };
    //   const result = await doctorsCollection.updateOne(query, updateDoc);
    //   res.json(result);
    // });

    // // User sending to db
    // app.post("/users", async (req, res) => {
    //   const user = req.body;
    //   const result = await usersCollection.insertOne(user);
    //   console.log(result);
    //   res.json(result);
    // });

    // // User upsert function
    // app.put("/users", async (req, res) => {
    //   const user = req.body;
    //   const filter = { email: user.email };
    //   const options = { upsert: true };
    //   const updateDoc = { $set: user };
    //   const result = await usersCollection.updateOne(filter,updateDoc,options);
    //   res.json(result);
    // });

    // // isStudent checking API
    // app.get("/users/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const query = { email: email };
    //   const user = await usersCollection.findOne(query);
    //   let isStudent = false;
    //   if (user?.roles === "student") {
    //     isStudent = true;
    //   }
    //   res.json({ student: isStudent });
    // });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
