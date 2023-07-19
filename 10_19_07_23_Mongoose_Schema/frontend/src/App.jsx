import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthorsContext, PostsContext } from "./context/Context";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Authors from "./pages/Authors/Authors";
import PostDetails from "./pages/PostDetails/PostDetails";
import "./App.css";

function App() {
  const [allAuthors, setAllAuthors] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  return (
    <>
      <AuthorsContext.Provider value={{ allAuthors, setAllAuthors }}>
        <PostsContext.Provider value={{ allPosts, setAllPosts }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </BrowserRouter>
        </PostsContext.Provider>
      </AuthorsContext.Provider>
    </>
  );
}

export default App;
