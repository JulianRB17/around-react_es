import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function App() {
  const [popupAvatar, setPopupAvatar] = React.useState(false);
  const [popupProfile, setPopupProfile] = React.useState(false);
  const [popupAddNewPlace, setPopupAddNewPlace] = React.useState(false);
  const [popupEraseCard, setPopupEraseCard] = React.useState(false);
  const [popupPic, setPopupPic] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");

  function handleEditAvatarClick() {
    setPopupAvatar(true);
  }

  function handleEditProfileClick() {
    setPopupProfile(true);
  }

  function handleAddPlaceClick() {
    setPopupAddNewPlace(true);
  }

  function handleEraseCardClick() {
    setPopupEraseCard(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopupPic(true);
  }

  function closeAllPopups() {
    if (popupAvatar) {
      setPopupAvatar(false);
    }
    if (popupProfile) {
      setPopupProfile(false);
    }
    if (popupAddNewPlace) {
      setPopupAddNewPlace(false);
    }
    if (popupEraseCard) {
      setPopupEraseCard(false);
    }
    if (popupPic) {
      setPopupPic(false);
      setSelectedCard("");
    }
  }

  return (
    <div className="body-container">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onEditAvatarClick={handleEditAvatarClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onEraseCardClick={handleEraseCardClick}
        onClose={closeAllPopups}
        popupAvatar={popupAvatar}
        popupEraseCard={popupEraseCard}
        popupAddNewPlace={popupAddNewPlace}
        popupProfile={popupProfile}
        popupPic={popupPic}
        imagePopup={selectedCard}
      />
      <Footer />
    </div>
  );
}
