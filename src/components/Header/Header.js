import logo from "../../images/header/logo/logo.svg";
import burger from "../../images/header/burger/burger.svg";
import ProfileLink from "../containers/ProfileLink/ProfileLink";
import { Link, Route } from "react-router-dom";

export default function Header ({loggedIn, onClickMenu}) {
    return(
        <header className="header">
            <div className="header__page">
                <Link to="/main" className="link header__logo"></Link>
                {!loggedIn ? 
                  <div className="header__links">
                      <Link to="/sign-up" className="link header__link">Регистрация</Link>
                      <Link to="/sign-in" className="link header__button">Войти</Link>
                  </div>
                :
                  <div className="header__links header__links_loged">
                    <div className="header__tabs">
                      <Link to="/movie" className="link header__link header__link_bold">Фильмы</Link>
                      <Link to="/saved-movie" className="link header__link">Сохранённые фильмы</Link>
                    </div>
                    <div className="header__tabs">
                      <ProfileLink />
                    </div>
                    <a className="link header__burger" onClick={onClickMenu}/>
                  </div>  
                }
            </div>
        </header>
        
    )
}