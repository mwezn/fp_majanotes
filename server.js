const express = require("express");
const app = express();

const notesRouter = require("./routes/notes");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//root of site is the notes page, redirect correctly
app.get("/", (req, res) => res.redirect("/notes"));
//when someone goes to a file in /public, let them see it with no dynamic rendering. this serves our css
app.use("/public", express.static("public"));

//handle all routes under notes
app.use("/notes", notesRouter);

app.listen(3000);