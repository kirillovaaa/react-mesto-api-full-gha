import React, { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";

/**
 * TODO:
 * 1. сделать все стили
 * 2. функционал кнопки выхода
 */
const Header = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="mesto-logo" />
      </Link>

      <div className="header__user-info">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <span className="header__user-email">{currentUser.email}</span>
                <button
                  className="header__button"
                  style={{ color: "#A9A9A9" }}
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to={"/sign-in"} className="header__button">
                Вход
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to={"/sign-up"} className="header__button">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
};

export default Header;
