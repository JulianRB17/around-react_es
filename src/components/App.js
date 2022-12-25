import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup.js';
import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAvatarProfilePopupOpen, setAvatarProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [popupEraseCard, setPopupEraseCard] = React.useState(false);
  const [popupPic, setPopupPic] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [newPlace, setNewPlace] = React.useState('');
  const [newPlaceCaption, setNewPlaceCaption] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.error(err));
  }, []);

  function closeAllPopups() {
    if (isAvatarProfilePopupOpen) {
      setAvatarProfilePopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      setEditProfilePopupOpen(false);
    }
    if (isAddPlacePopupOpen) {
      setAddPlacePopupOpen(false);
    }
    if (popupEraseCard) {
      setPopupEraseCard(false);
    }
    if (popupPic) {
      setPopupPic(false);
      setSelectedCard('');
    }
  }

  function handleEditAvatarClick() {
    setAvatarProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopupPic(true);
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error(err));
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api
      .setProfilePic(data)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error(err));
    closeAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewPlace(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.error(err));
    closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeBtn(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((deletedCardId) =>
        setCards((state) =>
          state.filter((card) => (card._id === deletedCardId ? '' : card))
        )
      )
      .catch((err) => console.error(err));
  }

  function handleNewPlaceCaptionChange(e) {
    setNewPlaceCaption(e.target.value);
  }

  function handleNewPlaceChange(e) {
    setNewPlace(e.target.value);
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handleUserDescriptionChange(e) {
    setUserDescription(e.target.value);
  }

  const renderCards = () =>
    cards.map((card) => {
      const { _id, owner, link, name, likes } = card;

      return (
        <Card
          key={_id}
          cardId={_id}
          cardOwnerId={owner._id}
          link={link}
          cardName={name}
          cardLikes={likes}
          onCardDelete={() => handleCardDelete(card)}
          onCardClick={() => handleCardClick(card)}
          onCardLike={() => handleCardLike(card)}
        />
      );
    });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body-container">
        <Header />
        <EditAvatarPopup
          isOpen={isAvatarProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onUserNameChange={handleUserNameChange}
          onUserDescriptionChange={handleUserDescriptionChange}
          setUserDescription={setUserDescription}
          setUserName={setUserName}
          name={userName}
          about={userDescription}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onNewPlaceCaptionChange={handleNewPlaceCaptionChange}
          onNewPlaceChange={handleNewPlaceChange}
          newPlace={newPlace}
          newPlaceCaption={newPlaceCaption}
          setNewPlace={setNewPlace}
          setNewPlaceCaption={setNewPlaceCaption}
          name={userName}
          about={userDescription}
        />

        <PopupWithForm
          title="¿Estás seguro?"
          submitText="Sí"
          isOpen={popupEraseCard}
          onClose={closeAllPopups}
          inputs={[]}
        />

        <ImagePopup
          isOpen={popupPic}
          onClose={closeAllPopups}
          imagePopup={selectedCard}
        />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onEditProfileClick={handleEditProfileClick}
          renderCards={renderCards}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
