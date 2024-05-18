//============================ Create Post
//protected
//POST : http://localhost:8000/api/posts
const createPost = async (req, res, next) => {
  res.json("Create Post");
};

//============================ Get all Posts
//Unprotected
//GET : http://localhost:8000/api/posts
const getAllPosts = async (req, res, next) => {
  res.json("Get all posts");
};

//============================ Get single Post
//Unprotected
//GET : http://localhost:8000/api/posts/:id
const getPost = async (req, res, next) => {
  res.json("Get single post");
};

//============================ Get Posts by category
//Unprotected
//GET : http://localhost:8000/api/posts/:category
const getcategoryPost = async (req, res, next) => {
  res.json(" Get post by category");
};

//============================ Edit Post
//Protected
//PATCH : http://localhost:8000/api/posts/:id
const editPost = async (req, res, next) => {
  res.json("Edit Post");
};

//============================ Delete Post
//Protected
//DELETE : http://localhost:8000/api/posts/:id
const deletePost = async (req, res, next) => {
  res.json(" Delete Post");
};
