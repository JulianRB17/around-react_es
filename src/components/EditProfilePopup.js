import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const { onClose, isOpen, onUpdateUser } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Editar Perfil"
      submitText="Guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputs={[
        {
          type: "text",
          placeholder: "Nombre",
          name: "name",
          id: "popup__input_name",
          minLength: "2",
          maxLength: "40",
          value: name || "",
          onChange: handleNameChange,
        },
        {
          type: "text",
          placeholder: "Acerca de",
          name: "about",
          id: "popup__input_about-me",
          minLength: "2",
          maxLength: "200",
          value: description || "",
          onChange: handleDescriptionChange,
        },
      ]}
    />
  );
}
