import "./Posts.css";
import Nav from "../../components/Nav/Nav";
import PostList from "../../components/PostList/PostList";
const Posts = () => {
  return (
    <>
      <Nav />
      <h1>Posts</h1>
      <PostList />
    </>
  );
};

export default Posts;
