// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  const reqNote = req.body;
  reqNote.id = uniqid();
  let currentNotes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
  currentNotes.push(reqNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(currentNotes));
  res.json(currentNotes);
});

//HTML Routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
