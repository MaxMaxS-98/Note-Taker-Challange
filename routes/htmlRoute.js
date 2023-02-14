// this file will handle the routing for the html pages
var path = require("path");
module.exports = function(app) {
// this is the route for the notes page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
// this is the route for the index page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};

