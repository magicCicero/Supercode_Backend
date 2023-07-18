import ContactItem from "../ContactItem/ContactItem";
import axios from "axios";
import { useEffect, useState } from "react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const readAllContacts = async () => {
      const res = await axios.get("/api/contacts");
      setContacts(res.data);
    };
    readAllContacts();
  }, []);

  return (
    <>
      <h1>Kontakte</h1>
      <div className="contact-list-container">
        <ContactItem contacts={contacts} />
      </div>
    </>
  );
};

export default ContactList;
