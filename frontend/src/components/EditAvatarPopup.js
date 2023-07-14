import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputAvatar = useRef();

  const handleSubmit = (e) => {
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          ref={inputAvatar}
          id="add-avatar-link-field"
          className="popup__input"
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          required={true}
        />
        <span
          id="add-avatar-link-field-error"
          className="popup__input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
