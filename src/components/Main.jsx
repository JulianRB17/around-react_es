import React from "react";
import { api } from "../utils/api.js";
import Card from "./Card.jsx";
import PopupWithForms from "./PopupWithForms";
import PopupWithImage from "./PopupWithImage";

export default function Main(props) {
  const {
    onEditAvatarClick,
    onAddPlaceClick,
    onEditProfileClick,
    onEraseCardClick,
    onCardClick,
    onClose,
    popupAddNewPlace,
    popupAvatar,
    popupEraseCard,
    popupPic,
    popupProfile,
    imagePopup,
  } = props;

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userId, setUserid] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, avatar, about, _id }, cards]) => {
        setUserName(name);
        setUserAvatar(avatar);
        setUserDescription(about);
        setUserid(_id);
        setCards(cards);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderCards = function () {
    return cards.map((card) => {
      return (
        <Card
          key={card._id}
          cardId={card._id}
          cardOwnerId={card.owner._id}
          userId={userId}
          link={card.link}
          cardName={card.name}
          cardLikes={card.likes}
          onCardClick={() => onCardClick(card)}
          onEraseCardClick={onEraseCardClick}
        />
      );
    });
  };

  return (
    <>
      <PopupWithForms
        title="Cambiar foto de perfil"
        submitText="Guardar"
        isOpen={popupAvatar}
        onClose={onClose}
        inputs={[
          {
            type: "url",
            placeholder: "Enlace a la imagen",
            name: "avatar",
            id: "profile-pic",
          },
        ]}
      />
      <PopupWithForms
        title="Editar Perfil"
        submitText="Guardar"
        isOpen={popupProfile}
        onClose={onClose}
        inputs={[
          {
            type: "text",
            placeholder: "Nombre",
            name: "name",
            id: "popup__input_name",
            minLength: "2",
            maxLength: "40",
          },
          {
            type: "text",
            placeholder: "Acerca de",
            name: "about",
            id: "popup__input_about-me",
            minLength: "2",
            maxLength: "200",
          },
        ]}
      />
      <PopupWithForms
        title="Nuevo lugar"
        submitText="Guardar"
        isOpen={popupAddNewPlace}
        onClose={onClose}
        inputs={[
          {
            type: "text",
            placeholder: "Título",
            name: "newPlaceCaption",
            id: "popup__input_new-place-title",
            minLength: "2",
            maxLength: "30",
          },
          {
            type: "url",
            placeholder: "Enlace a la imagen",
            name: "newPlace",
            id: "popup__input_new-place-pic",
          },
        ]}
      />

      <PopupWithForms
        title="¿Estás seguro?"
        submitText="Sí"
        isOpen={popupEraseCard}
        onClose={onClose}
        inputs={[]}
      />

      <PopupWithImage
        isOpen={popupPic}
        onClose={onClose}
        imagePopup={imagePopup}
      />

      <section className="profile">
        <div
          className="profile__pic"
          onClick={onEditAvatarClick}
          style={{ backgroundImage: `src(${userAvatar})` }}
        >
          <div className="profile__overlay">
            <div className="profile__overlay-icon"></div>
          </div>
        </div>
        <div className="profile__text-container">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__about-me">{userDescription}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlaceClick}></button>
      </section>

      <section className="cards">{renderCards()}</section>
    </>
  );
}
