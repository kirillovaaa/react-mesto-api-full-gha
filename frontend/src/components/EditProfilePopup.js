import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          id="edit-name-field"
          className="popup__input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required={true}
          value={name}
          onChange={handleNameChange}
        />

        <span id="edit-name-field-error" className="popup__input-error"></span>
      </div>

      <div className="popup__input-wrapper">
        <input
          id="edit-description-field"
          className="popup__input"
          type="text"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required={true}
          value={description}
          onChange={handleDescriptionChange}
        />

        <span
          id="edit-description-field-error"
          className="popup__input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
