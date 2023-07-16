import React, { useRef } from 'react';

const Login = ({ onSubmit }) => {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault(); // отменяем стандартный переход на адрес формы
    onSubmit({
      email: email.current.value,
      password: password.current.value,
    });
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <div className="signup__registration">
          <h1 className="signup__heading">Вход</h1>

          <div className="signup__input-wrapper">
            <input
              ref={email}
              className="signup__input"
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Email"
              required={true}
            />
          </div>

          <div className="signup__input-wrapper">
            <input
              ref={password}
              className="signup__input"
              type="password"
              autoComplete="current-password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="30"
              required={true}
            />
          </div>
        </div>

        <div className="signup__footer">
          <button className="signup__registration-button" type="submit">
            Войти
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
