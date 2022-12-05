import React from "react";

export default function PopupWithForm(props) {
  const { title, inputs, submitText, isOpen, onClose } = props;

  const popupOpenClass = isOpen ? " popup_opened" : "";
  const popupBodySizeClass = inputs.length < 2 ? " popup__body_medium" : "";

  return (
    <section className={`popup${popupOpenClass}`}>
      <div className="popup__overlay"></div>
      <div className={`popup__body${popupBodySizeClass}`}>
        <button className="popup__close-btn" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__input-container">
          {inputs.map(
            ({ type, placeholder, name, id, minLength, maxLength }) => {
              return (
                <React.Fragment key={id}>
                  <input
                    type={type}
                    className="popup__input popup__input_error"
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    minLength={minLength || null}
                    maxLength={maxLength || null}
                    required
                  />
                  <div
                    className="popup__input-underline"
                    id="popup__input_profile-pic-underline"
                  ></div>
                  <span
                    className="popup__error-msg"
                    id="popup__input_profile-pic-error"
                  ></span>
                </React.Fragment>
              );
            }
          )}
          <button className="popup__save-btn" type="submit">
            {submitText}
          </button>
        </form>
      </div>
    </section>
  );
}