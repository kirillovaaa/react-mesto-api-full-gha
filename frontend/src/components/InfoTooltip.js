import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";
import closeIcon from "../images/close.svg";

const InfoTooltip = ({ isOpen, isSuccessful, onClose }) => {
  const tooltipData = {
    success: {
      imageSrc: success,
      text: "Вы успешно зарегистрировались!",
    },
    error: {
      imageSrc: error,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
    },
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__tooltip">
        <img
          className="popup__tooltip-icon"
          src={
            isSuccessful
              ? tooltipData.success.imageSrc
              : tooltipData.error.imageSrc
          }
          alt="Галочка"
        />

        <span className="popup__tooltip-text">
          {isSuccessful ? tooltipData.success.text : tooltipData.error.text}
        </span>

        <button className="popup__close-button" type="button" onClick={onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};

export default InfoTooltip;
