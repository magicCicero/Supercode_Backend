import axios from "axios"
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState();
  const mySearch = ["one","two"]  
  const searchParams = new URLSearchParams({mySearch})
  console.log(searchParams.toString())
  useEffect(() => {
    axios.get(`/api/status?search=${mySearch}&other=bla`)
      .then((data) => setStatus(data.status))
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, []);

  return <>API Status: {status}</>;
}

export default App;
