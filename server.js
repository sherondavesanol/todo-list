//jshint: esversion:6

const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = [];
const workItems = [];

app.get("/", function(req, res) {
 
  const day = date.getDay();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req,res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req,res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});