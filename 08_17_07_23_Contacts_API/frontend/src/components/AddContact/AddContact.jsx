import axios from "axios";
import { useState, useEffect } from "react";

const AddContact = () => {
  const [contact, setContact] = useState([]);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [street, setStreet] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0);

  const addNewContact = async () => {
    let newContact = {
      name: name,
      telefone: tel,
      street: street,
    };

    await axios
      .post("/api/contacts", newContact)
      .then((res) => setContact(res.data), console.log(contact))
      .catch((err) => console.log(err));

    setUpdateCounter(updateCounter + 1);
  };

  const saveName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const saveStreet = (e) => {
    setStreet(e.target.value);
    console.log(street);
  };
  const saveTel = (e) => {
    setTel(e.target.value);
    console.log(tel);
  };
  useEffect(() => {
    const updateContacts = async () => await axios.get("/api/contacts");
    updateContacts();
    console.log(updateCounter);
  }, [updateCounter]);

  return (
    <>
      <button onClick={addNewContact}>Kontakt hinzufügen</button>
      <input type="text" placeholder="Name" onChange={saveName} value={name} />
      <input
        type="text"
        placeholder="Straße"
        onChange={saveStreet}
        value={street}
      />
      <input type="text" placeholder="Tel" onChange={saveTel} value={tel} />
    </>
  );
};

export default AddContact;
