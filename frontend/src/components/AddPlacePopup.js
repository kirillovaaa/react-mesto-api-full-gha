import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          id="add-place-name-field"
          className="popup__input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required={true}
          value={name}
          onChange={handleNameChange}
        />

        <span
          id="add-place-name-field-error"
          className="popup__input-error"
        ></span>
      </div>

      <div className="popup__input-wrapper">
        <input
          id="add-place-link-field"
          className="popup__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required={true}
          value={link}
          onChange={handleLinkChange}
        />

        <span
          id="add-place-link-field-error"
          className="popup__input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
