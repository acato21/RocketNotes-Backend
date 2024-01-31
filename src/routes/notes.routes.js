const express = require("express");
const noteRoute = express();

const NotesController = require("../controllers/NotesController");
const notesController = new NotesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

noteRoute.get("/", ensureAuthenticated, notesController.index)
noteRoute.post("/create", ensureAuthenticated, notesController.create);
noteRoute.delete("/delete/:id", notesController.delete);
noteRoute.get("/show/:note_id", ensureAuthenticated, notesController.show);
noteRoute.get("/tags", ensureAuthenticated, notesController.tags);


module.exports = noteRoute;