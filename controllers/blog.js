const Blog = require("../models/Blog");

module.exports.createBlog = async (req, res) => {
  try {
    let newBlog = new Blog({
      userId: req.user.id,
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
    });
    //Save new blog
    await newBlog.save();
    return res.status(201).send({ message: "New blogpost created" });
  } catch (err) {
    console.error("Error in saving blogpost: ", err);
    return res.status(500).send({ error: "Error in saving blogpost" });
  }
};
module.exports.updateBlog = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    blogData.author = req.body.author;
    blogData.title = req.body.title;
    blogData.content = req.body.content;
    //Save new blog
    await blogData.save();
    return res
      .status(201)
      .send({ message: "Blogpost updated successfuly", blogData });
  } catch (err) {
    console.error("Error in saving blogpost update", err);
    return res.status(500).send({ error: "Error in saving blogpost update" });
  }
};
module.exports.addLikes = async (req, res) => {
  try {
    const { id } = req.user;
    // Find the blog post
    const blogData = await Blog.findById(req.params.id);
    // Check if the user has already liked this post
    if (blogData.likes.some((like) => like.userId === id)) {
      return res.status(400).send(true);
    }
    // Remove userId from disLikes array if present
    blogData.disLikes = blogData.disLikes.filter(
      (disLike) => disLike.userId !== id
    );
    // Add the userId to the likes array
    blogData.likes.push({ userId: id });
    // Save the updated blog post
    await blogData.save();
    return res.status(201).send({ message: "Like successfully" });
  } catch (err) {
    console.error("Error in saving blog post like", err);
    return res.status(500).send({ error: "Error in saving blog post like" });
  }
};
module.exports.addDisLikes = async (req, res) => {
  try {
    const { id } = req.user;
    // Find the blog post
    const blogData = await Blog.findById(req.params.id);
    // Check if the user has already liked this post
    if (blogData.disLikes.some((dislike) => dislike.userId === id)) {
      return res.status(400).send(true);
    }
    // Remove userId from likes array if present
    blogData.likes = blogData.likes.filter((like) => like.userId !== id);
    // Add the userId to the likes array
    blogData.disLikes.push({ userId: id });
    // Save the updated blog post
    await blogData.save();
    return res.status(201).send({ message: "Dislike successfully" });
  } catch (err) {
    console.error("Error in saving blog post dislike", err);
    return res.status(500).send({ error: "Error in saving blog post dislike" });
  }
};
module.exports.addComment = async (req, res) => {
  try {
    const { id } = req.user;
    const { description } = req.body;
    // Find the blog post
    const blogData = await Blog.findById(req.params.id);
    blogData.comments.push({ userId: id, description });

    await blogData.save();
    return res.status(201).send({ message: "Comment added successfully" });
  } catch (err) {
    console.error("Error in saving adding a comment", err);
    return res.status(500).send({ error: "Error in saving adding a comment" });
  }
};
module.exports.removeComment = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);

    const index = blogData.comments.findIndex(
      (comment) => comment.id === req.params.cid
    );

    blogData.comments.splice(index, 1);

    await blogData.save();
    return res.status(201).send({ message: "Comment removed successfully" });
  } catch (err) {
    console.error("Error in saving removing a comment", err);
    return res
      .status(500)
      .send({ error: "Error in saving removing a comment" });
  }
};
module.exports.getBlog = async (req, res) => {
  try {
    const blogData = await Blog.findById(req.params.id);
    if (blogData) {
      return res.status(201).send({ blogpost: blogData });
    }
    return res.status(201).send(null);
  } catch (err) {
    console.error("Error in finding a blogpost", err);
    return res.status(500).send({ error: "Error in finding a blogpost" });
  }
};
module.exports.getUsersBlog = async (req, res) => {
  try {
    const blogData = await Blog.find({ userId: req.params.id });
    if (blogData) {
      return res.status(201).send({ blogpost: blogData });
    }
    return res.status(201).send(null);
  } catch (err) {
    console.error("Error in finding a blogpost", err);
    return res.status(500).send({ error: "Error in finding a blogpost" });
  }
};
module.exports.removeBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(201).send({ message: "Blogpost successfully removed" });
  } catch (err) {
    console.error("Error in removing a blogpost", err);
    return res.status(500).send({ error: "Error in removing a blogpost" });
  }
};
