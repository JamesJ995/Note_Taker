// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "notes.html"))
);
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
