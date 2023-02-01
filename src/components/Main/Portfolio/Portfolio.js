import { Link } from "react-router-dom";
export default function Portfolio () {
    return(
        <section className="portfolio section">
            <div className="section__page section__page_screen_main">
                <h2 className="section__title section__title_theme_grey">Портфолио</h2>
                <ul className="portfolio__links">
                    <li className="portfolio__link">
                        <a href="https://mcnadodls.github.io/how-to-learn/" target="_blank" className="link portfolio__arrow">Статичный сайт</a>
                    </li>
                    <li className="portfolio__link">
                        <a href="https://mcnadodls.github.io/russian-travel/" target="_blank" className="link portfolio__arrow">Адаптивный сайт</a>
                    </li>
                    <li className="portfolio__link">
                        <a href="http://mesto.mcnad.nomoredomains.club/" target="_blank"className="link portfolio__arrow">Одностраничное приложение</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}