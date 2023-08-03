import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./user/UserContext";

// Routes
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <nav>
        <a href="/">Home</a>
        {!isLoggedIn && (
          <>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </>
        )}
        {isLoggedIn && (
          <>
            <a href="/profile">Profile</a>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
