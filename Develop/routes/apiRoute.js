var contents = require("../db/noteContents");

const fs = require("fs");
const util = require("util");
const WriteFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(contents);
  });

  app.post("/api/notes", function(req, res) {

    let newNote = req.body;
    let id = contents[contents.length - 1]
    let newId = id+ 1;
    newNote.id = newId;

    contents.push(newNote);

    WriteFileAsync("./db/noteContents.json", JSON.stringify(contents)).then(function() {
        console.log("Note saved!");
        });
    res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        let id = req.params.id;
        let index = contents.findIndex(x => x.id == id);
        contents.splice(index, 1);
        WriteFileAsync("./db/noteContents.json", JSON.stringify(contents)).then(function() {
            console.log("Note deleted!");
        });
        res.json(contents);
    });
};
