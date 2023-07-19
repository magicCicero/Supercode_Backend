import "./PostDetails.css";
import Nav from "../../components/Nav/Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const PostDetails = () => {
  const params = useParams();
  const idPost = params.id;
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/post/${idPost}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Nav />
      <h1>Details</h1>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author}</p>
    </>
  );
};

export default PostDetails;
