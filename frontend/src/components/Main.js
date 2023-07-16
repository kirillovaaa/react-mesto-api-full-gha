import React, { useContext } from 'react';
import Card from './Card';
import edit from '../images/edit.svg';
import plus from '../images/plus.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({
  cards,
  // обработчики открытия попапов
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  // обработчик нажатия на карточку
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      {/* <!-- блок профиля --> */}
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button className="profile__avatar-edit" onClick={onEditAvatar}>
            <img
              className="profile__avatar-edit-icon"
              src={edit}
              alt="Редактировать"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-icon"
                src={edit}
                alt="Редактировать"
              />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img className="profile__add-icon" src={plus} alt="Плюс" />
        </button>
      </section>

      {/* <!-- сетка с карточками мест --> */}
      <section className="places">
        {cards
          .slice(0)
          .reverse()
          .map((card) => (
            <Card
              key={card._id}
              card={card}
              onClick={onCardClick}
              onLike={onCardLike}
              onDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
};

export default Main;
