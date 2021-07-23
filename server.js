// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(__dirname + '/public'));

// Sets up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

//POST API - adds requested note to the notes database
app.get("/api/notes", (req, res) => {
  fs.readFile("public/db/db.json", function (err, data) {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  })

})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
