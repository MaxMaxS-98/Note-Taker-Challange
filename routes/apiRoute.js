var contents = require("../db/contents");
// require fs and util
const fs = require("fs");
const util = require("util");
const WriteFileAsync = util.promisify(fs.writeFile);

// this is the api route
module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(contents);
  });
// api post route
  app.post("/api/notes", function(req, res) {
// create a new note
    let newNote = req.body;
    let id = contents[contents.length - 1]
    let newId = id+ 1;
    newNote.id = newId;
// push the new note to the contents array
    contents.push(newNote);
// write the new note to the json file
    WriteFileAsync("./db/noteContents.json", JSON.stringify(contents)).then(function() {
        console.log("Note saved!");
        });
    res.json(newNote);
    });
// delete route for the notes
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
