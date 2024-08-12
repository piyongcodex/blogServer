const express = require("express");
const blogController = require("../controllers/blog");
const router = express.Router();
const { verify } = require("../auth");

// Route for creating a blog post
router.post("/", verify, blogController.createBlog);
// Route for updating a blog
router.patch("/:id/blog", verify, blogController.updateBlog);
// Route for adding like
router.patch("/:id/like", verify, blogController.addLikes);
// Route for adding dislike
router.patch("/:id/dislike", verify, blogController.addDisLikes);
// Route for adding a comment
router.post("/:id/comments/", verify, blogController.addComment);
// Route for adding removing a comment
router.patch("/:id/comments/:cid", verify, blogController.removeComment);
// Route for retrieving blogpost
router.get("/:id", verify, blogController.getBlog);
// Route for retrieving blogposts of the user
router.get("/users/:id", verify, blogController.getUsersBlog);
// Route for deleting a blogposts
router.delete("/:id", verify, blogController.removeBlog);

module.exports = router;
