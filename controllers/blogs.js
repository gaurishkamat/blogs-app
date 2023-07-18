const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

// get all blogs from the database
blogRouter.get("/", function (request, response, next) {
  Blog.find({})
    .then((results) => {
      response.json(results);
    })
    .catch((error) => {
      next(error);
    });
});

// get a specific blog by id from the database
blogRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id).then((result) => {
    response.status(201).json(result);
  });
});

// add a blog to the database
blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// delete a specific blog by id from the databse
blogRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndRemove(request.params.id).then((result) => {
    response.status(201).json(result);
  });
});

// update a specific blog by id from the databse
blogRouter.patch("/:id", (request, response) => {
  const blog = request.body;

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(
    (result) => {
      response.status(201).json(result);
    }
  );
});

module.exports = blogRouter;
