import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserContext from "../context/userContext";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate()

  const token  = currentUser?.token;

  useEffect(() =>{
    if(!token){
      navigate("/login")
    }
  },[])

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

  return (
    <>
      <section className="create-post">
        <div className="container">
          <h2>Create Post</h2>
          <p className="form_error-message">This is an error message</p>
          <form className="form create-post_form">
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
              Create
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
