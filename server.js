import express from "express";
import mongoose from "mongoose";
import Products from "./schema.js";
import cors from "cors";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.json());

// Set up CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://5173-idx-backend-1727990511475.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev/'
      // Add any other necessary origins here
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.post("/products/api", async (req, res) => {
  const dbCard = req.body;
  Products.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/api", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

mongoose.set('strictQuery', false);
mongoose
  .connect("mongodb+srv://primecoder871:60y99JKMKpfIlbe0@tutorial.dj1ks.mongodb.net/What-API?retryWrites=true&w=majority&appName=Tutorial")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });