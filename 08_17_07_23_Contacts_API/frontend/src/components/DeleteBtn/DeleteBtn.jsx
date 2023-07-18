import axios from "axios";
import { useState, useEffect } from "react";
const DeleteBtn = (props) => {
  const [updateCounter, setUpdateCounter] = useState(0);
  const deleteContact = async () => {
    await axios.delete(`/api/contacts/${props.id}`);
    console.log("Kontakt gelöscht");
    setUpdateCounter(updateCounter + 1);
  };
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("/api/contacts");
  }, [updateCounter]);

  return (
    <>
      <button onClick={deleteContact}>Kontakt löschen</button>
    </>
  );
};

export default DeleteBtn;
