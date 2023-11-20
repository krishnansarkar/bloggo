import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var blogposts = [{
  title: "First Post",
  content: "This is my first post",
}];

app.use(bodyParser.urlencoded({extended: true}));

function renderHome(req, res) {
  res.render("index.ejs", {
    blogposts: blogposts
  });
}

app.get("/", (req, res) => {
  renderHome(req, res);
})

app.post("/submit", (req, res) => {
  var newPost = {
    title: req.body["title"],
    content: req.body["content"]
  }
  blogposts.push(newPost);
  renderHome(req, res);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})