import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postCounter = 0;
var blogposts = [{
  title: "First Post",
  content: "This is my first post",
  id: postCounter
}];

app.use(bodyParser.urlencoded({extended: true}));

function renderHome(res) {
  res.render("index.ejs", {
    blogposts: blogposts
  });
}

app.get("/", (req, res) => {
  renderHome(res);
})

app.post("/submit", (req, res) => {
  var newPost = {
    title: req.body["title"],
    content: req.body["content"],
    id: ++postCounter
  }
  blogposts.unshift(newPost);
  req.method = "GET";
  res.redirect('/');
})

app.delete("/delete/:id", (req, res) => {
  var postID = parseInt(req.params.id);
  blogposts = blogposts.filter(x => x.id != postID);
  //console.log(`${postID}:${postIndex}:${blogposts[postIndex]}` )
  //blogposts.splice(blogposts.indexOf({id: postID}),1);
  renderHome(res);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})