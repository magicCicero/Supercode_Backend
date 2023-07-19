import PostItem from "../PostItem/PostItem";
import "./PostList.css";
const PostList = () => {
  return (
    <>
      <h1>Letzte Beiträge</h1>
      <section className="post-list-container">
        <PostItem />
      </section>
    </>
  );
};

export default PostList;
