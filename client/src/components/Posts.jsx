import React from "react";

import Thumbnail1 from "../images/blog1.jpg";
import Thumbnail2 from "../images/blog2.jpg";
import Thumbnail3 from "../images/blog3.jpg";
import Thumbnail4 from "../images/blog4.jpg";

const DUMMY_POSTS = [
  {
    id: "1",
    thumbnail: Thumbnail1,
    category: "education",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate veritatis dolore iste at ab libero eos doloribus laborum quae sapiente voluptatem, labore, quia ut esse? Rerum sint a nulla animi!",
    authorId: 3,
  },
  {
    id: "2",
    thumbnail: Thumbnail2,
    category: "science",
    title: "This is the title of the very second post on this blog.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate veritatis dolore iste at ab libero eos doloribus laborum quae sapiente voluptatem, labore, quia ut esse? Rerum sint a nulla animi!",
    authorId: 1,
  },
  {
    id: "3",
    thumbnail: Thumbnail3,
    category: "weather",
    title: "This is the title of the very third post on this blog.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate veritatis dolore iste at ab libero eos doloribus laborum quae sapiente voluptatem, labore, quia ut esse? Rerum sint a nulla animi!",
    authorId: 11,
  },
  {
    id: "4",
    thumbnail: Thumbnail4,
    category: "farming",
    title: "This is the title of the very last post on this blog.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate veritatis dolore iste at ab libero eos doloribus laborum quae sapiente voluptatem, labore, quia ut esse? Rerum sint a nulla animi!",
    authorId: 13,
  },
];

const Posts = () => {
  return <div>Posts</div>;
};

export default Posts;
