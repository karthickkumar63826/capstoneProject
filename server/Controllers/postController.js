const Posts = require("../Models/postModel");
const User = require("../Models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("../Models/errorModel");

//============================ Create Post
//protected
//POST : http://localhost:8000/api/posts
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return next(
        new HttpError("Fill in all blocks and choose thumbnails", 422)
      );
    }

    const { thumbnail } = req.files;
    if (thumbnail > 2000000) {
      return next(new HttpError("Thumbnail too big, should be less than 2mb."));
    }

    let filename = thumbnail.name;
    let splittedThumbnailName = filename.split(".");
    let newFileName = `${splittedThumbnailName[0]}${uuidv4()}.${
      splittedThumbnailName[splittedThumbnailName.length - 1]
    }`;
    let filePath = path.join(__dirname, "..", "/uploads", newFileName);
    thumbnail.mv(filePath, async (err) => {
      if (err) {
        return next(new HttpError("Unable to move thumbnail", 422));
      }
      try {
        const newPost = await Posts.create({
          title,
          category,
          description,
          thumbnail: newFileName,
          creator: req.user.id,
        });

        if (!newPost) {
          return next(new HttpError("Post couldn't be created", 422));
        }

        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts + 1;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

        res.status(200).json(newPost);
      } catch (err) {
        return next(new HttpError("problem in thumbnail", 422));
      }
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

//============================ Get all Posts
//Unprotected
//GET : http://localhost:8000/api/posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//============================ Get single Post
//Unprotected
//GET : http://localhost:8000/api/posts/:id
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//============================ Get Posts by category
//Protected
//GET : http://localhost:8000/api/posts/categories/:category
const getCategoryPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryPost = await Posts.find({ category }).sort({ createdAt: -1 });
    if (categoryPost.length == 0) {
      return next(new HttpError("No posts available in this category", 404));
    }

    res.status(200).json(categoryPost);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//============================ Get Posts by category
//Unprotected
//GET : http://localhost:8000/api/posts/users/:id
const getAuthorPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Posts.find({ creator: id }).sort({ createdAt: -1 });
    if (posts.length == 0) {
      return next(new HttpError("No posts available"));
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

//============================ Edit Post
//Protected
//PATCH : http://localhost:8000/api/posts/:id
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;

    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all details", 422));
    }

    const oldPost = await Posts.findById(postId);

    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await Posts.findByIdAndUpdate(
          postId,
          { title, category, description },
          { new: true }
        );
      } else {
        const oldPath = path.join(
          __dirname,
          "..",
          "/uploads",
          oldPost.thumbnail
        );
        fs.unlink(oldPath, async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        });

        const { thumbnail } = req.files;

        if (thumbnail.size > 2000000) {
          return next(
            new HttpError("Thumbnail too big, should be less than 2mb")
          );
        }
        fileName = thumbnail.name;
        let splittedFileName = fileName.split(".");
        newFileName = `${splittedFileName[0]}${uuidv4()}.${
          splittedFileName[splittedFileName.length - 1]
        }`;

        const newPath = path.join(__dirname, "..", "/uploads", newFileName);
        thumbnail.mv(newPath, async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        });

        updatedPost = await Posts.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFileName },
          { new: true }
        );
      }

      if (!updatedPost) {
        return next(new HttpError("Couldn't update post", 422));
      }

      res.status(201).json(updatedPost);
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

//============================ Delete Post
//Protected
//DELETE : http://localhost:8000/api/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post Unavailable", 400));
    }
    const post = await Posts.findById(postId);

    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "/uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Posts.findByIdAndDelete(postId);
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          }
        }
      );

      res.status(202).json(`post ${postId} deleted successfully.`);
    } else {
      return next(
        new HttpError("to get post delete, need authentication ", 403)
      );
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getPost,
  getCategoryPost,
  getAuthorPost,
};
