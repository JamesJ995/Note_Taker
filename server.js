// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//GET API - read db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) =>
  fs.readFile("./Develop/db/db.json", function (err, data) {
    if (err) throw err;
    const results = JSON.parse(data);
    res.json(results);
  })
);

//POST API - adds requested note to the notes database
app.post("/api/notes", (req, res) => {
  let reqNote = req.body;
  reqNote.id = uuidv4();
  let currentNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
  currentNotes.push(reqNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(currentNotes));
  return console.log("Added new note!");
});

//HTML Routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/notes.html"))
);
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/index.html"))
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
