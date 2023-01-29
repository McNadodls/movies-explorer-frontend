import { Link } from "react-router-dom";
import ProfileLink from "../../containers/ProfileLink/ProfileLink"

export default function MenuPopup({isOpen, onClose}) {
    return (
        <div className={`popup  ${isOpen && 'menu-popup'}`}>
            <div className="menu-popup__container">
                <button className="link menu-popup__close-btn" onClick={onClose}></button>
                <nav className="menu-popup__links">
                    <div className="menu-popup__tabs">
                        <Link to="/" className="link menu-popup__link">Главная</Link>
                        <Link to="movie" className="link menu-popup__link">Фильмы</Link>
                        <Link to="saved-movie" className="link menu-popup__link">Сохранённые фильмы</Link>
                    </div>
                    <ProfileLink />
                </nav>
            </div>
        </div>
    )
}