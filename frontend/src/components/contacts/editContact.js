import ContactForm from "./contactForm";
import { useParams } from "react-router-dom";

const EditContact = () => {
  const { slug } = useParams();
  return <ContactForm slug={slug} method="put" operation="Edit" />;
};

export default EditContact;
