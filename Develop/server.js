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

//API Routes
app.get("/api/notes", (req, res) => {
  const chosen = req.params.character;

  console.log(chosen);

  for (let i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

function readDb() {
  fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
    if (err) throw err;
    return true;
  });
}
