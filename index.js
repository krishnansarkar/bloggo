import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postCounter = 0;
var blogposts = [{
  title: "First Post",
  content: "This is my first post",
  isEditting: false,
  id: postCounter,
}];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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
    isEditting: false,
    id: ++postCounter
  }
  blogposts.unshift(newPost);
  req.method = "GET";
  res.redirect("/");
})

app.patch("/edit/:id", (req, res) => {
  var postID = parseInt(req.params.id);
  var post = blogposts.find(x => x.id == postID);
  post.isEditting = true;
  renderHome(res);
})

app.put("/edit-submit/:id/:content", (req, res) => {
  var postID = parseInt(req.params.id);
  var post = blogposts.find(x => x.id == postID);
  post.content = req.params.content;
  post.isEditting = false;
  console.log(post);
  renderHome(res);
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