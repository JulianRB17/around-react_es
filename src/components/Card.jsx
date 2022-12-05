import React from "react";

export default function Card(props) {
  const {
    cardOwnerId,
    userId,
    link,
    cardName,
    cardLikes,
    onCardClick,
    onEraseCardClick,
  } = props;

  return (
    <div className="cards__card-container">
      <button
        className="cards__trash-btn"
        onClick={onEraseCardClick}
        style={
          userId !== cardOwnerId ? { display: "none" } : { display: "block" }
        }
      ></button>
      <img
        className="cards__img"
        src={link}
        alt={cardName}
        onClick={onCardClick}
      />
      <div className="cards__footer">
        <h2 className="cards__name">{cardName}</h2>
        <div className="cards__like-container">
          <button className="cards__like-btn"></button>
          <p className="cards__like-number">{cardLikes.length}</p>
        </div>
      </div>
    </div>
  );
}
