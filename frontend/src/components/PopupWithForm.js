import React from 'react';
import closeIcon from '../images/close.svg';

const PopupWithForm = ({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // отменяем стандартный переход на адрес формы
    onSubmit(e);
  };

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <form className="popup__form" name={name} onSubmit={handleSubmit}>
        <h2 className="popup__heading">{title}</h2>

        {children}

        <button type="submit" className="popup__save-button">
          Сохранить
        </button>

        <button
          className="popup__close-button"
          type="button"
          id="popup-profile-close"
          onClick={onClose}
        >
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </form>
    </div>
  );
};

export default PopupWithForm;
