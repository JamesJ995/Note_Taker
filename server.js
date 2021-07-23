//======================================================================
// Dependencies
//======================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); //npm library to give unique id's easily
const database = require("./public/db/db.json");

//======================================================================
// Housekeeping, setup express server, set port number
//======================================================================
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//======================================================================
// HTML routes using path and express
//======================================================================
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

//======================================================================
// API (/api/notes) GET and POST routes
//======================================================================
app.get("/api/notes", (req, res) => {
  fs.readFile("public/db/db.json", function (err, data) {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  newNote = req.body;
  res.json(newNote);
});

//======================================================================
// Exporess event handler
//======================================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
