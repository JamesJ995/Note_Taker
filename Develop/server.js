// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET API - read db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) =>
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    const results = JSON.parse(data);
    res.json(results);
  })
);

//POST API - add a new note to the note database
app.post("/api/notes", (req, res) => {
  const reqNote = req.body;

  // Assigned unique id obtained from 'uuid' package
  reqNote.id = uuidv4();

  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  // Pushed new note in notes file 'db.json'
  data.push(newNote);

  // Written notes data to 'db.json' file
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
});

//HTML Routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
