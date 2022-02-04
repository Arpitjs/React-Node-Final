import ContactForm from "./contactForm";

const CreateContact = () => {
  return <ContactForm method="post" operation="Add" validate={true} />;
};

export default CreateContact;
