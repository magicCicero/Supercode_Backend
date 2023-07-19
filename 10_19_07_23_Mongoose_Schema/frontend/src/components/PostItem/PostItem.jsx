import { useContext, useState, useEffect } from "react";
import { PostsContext, AuthorsContext } from "../../context/Context";
import "./PostItem.css";
import DetailBtn from "../DetailBtn/DetailBtn";

const PostItem = () => {
  const { allPosts, setAllPosts } = useContext(PostsContext);
  const { allAuthors, setAllAuthors } = useContext(AuthorsContext);

  const getAuthorName = (authorId) => {
    const author = allAuthors.find((author) => author._id === authorId);

    return author ? author.name : "Kein Autor";
  };
  return (
    <>
      {allPosts?.map((post) => (
        <article key={post._id} className="post-item">
          <h2>{post.title}</h2>
          <p>Verfasst von {getAuthorName(post.author)}</p>
          <DetailBtn postId={post._id} />
        </article>
      ))}
    </>
  );
};

export default PostItem;
