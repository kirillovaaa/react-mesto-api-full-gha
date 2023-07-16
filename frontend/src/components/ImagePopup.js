import React from 'react';
import closeIcon from '../images/close.svg';

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup ${card && 'popup_opened'}`} id="popup-image">
      <div className="popup__image-wrapper">
        <img className="popup__image" src={card?.link} alt={card?.name} />

        <p className="popup__image-description">{card?.name}</p>

        <button className="popup__close-button" type="button" onClick={onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};
export default ImagePopup;
