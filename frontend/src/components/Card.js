import React, { useContext } from "react";
import deleteIcon from "../images/delete.svg";
import likeActiveIcon from "../images/heart-fill.svg";
import likeInactiveIcon from "../images/heart-stroke.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onClick, onLike, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((userId) => userId === currentUser._id);

  const handleClick = () => {
    onClick(card);
  };

  const handleLike = (e) => {
    onLike(card._id, isLiked);
  };

  const handleDelete = (e) => {
    onDelete(card._id);
  };

  return (
    <div className="places__item">
      <img
        className="places__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />

      <div className="places__name-wrapper">
        <h2 className="places__name">{card.name}</h2>

        <button
          type="button"
          className="places__fav-button"
          onClick={handleLike}
        >
          <img
            className="places__fav-image"
            src={isLiked ? likeActiveIcon : likeInactiveIcon}
          />
          <span className="places__fav-likes">{card.likes.length}</span>
        </button>
      </div>

      <button
        type="button"
        className="places__delete-button"
        onClick={handleDelete}
      >
        {isOwn && <img className="places__delete-icon" src={deleteIcon} />}
      </button>
    </div>
  );
};

export default Card;
