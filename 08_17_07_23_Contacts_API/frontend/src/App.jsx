import { useState } from "react";
import AddContact from "./components/AddContact/AddContact";

import "./App.css";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Kontaktliste</h1>
      <AddContact />
      <ContactList />
    </>
  );
}

export default App;
