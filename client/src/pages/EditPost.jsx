import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const module = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      setError("");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        console.log(response.data);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
        setThumbnail(response.data.thumbnail);
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <section className="create-post">
        <div className="container">
          <h2>Edit Post</h2>
          {error && <p className="form_error-message">{error}</p>}
          <form className="form create-post_form" onSubmit={editPost}>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {POST_CATEGORIES.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </select>
            <ReactQuill
              modules={module}
              formats={formats}
              value={description}
              onChange={setDescription}
            />
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="jpg, png, jpeg"
            />
            <button type="submit" className="btn primary">
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditPost;
