import DeleteBtn from "../DeleteBtn/DeleteBtn";

const ContactItem = (props) => {
  return (
    <>
      {props.contacts.map((contact) => (
        <div className="contact-item" key={contact._id}>
          <p>{contact._id}</p>
          <p>{contact.name}</p>
          <p>{contact.telefone}</p>
          <p>{contact.street}</p>
          <DeleteBtn id={contact._id} />
        </div>
      ))}
    </>
  );
};

export default ContactItem;
