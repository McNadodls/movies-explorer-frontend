import { Link } from "react-router-dom";
export default function Portfolio () {
    return(
        <section className="portfolio section">
            <div className="section__page section__page_screen_main">
                <h2 className="section__title section__title_theme_grey">Портфолио</h2>
                <nav className="portfolio__navigation">
                    <a href="https://mcnadodls.github.io/how-to-learn/" target="_blank" className="link portfolio__link"><p className="portfolio__signature">Статичный сайт</p></a>
                    <a href="https://mcnadodls.github.io/russian-travel/" target="_blank" className="link portfolio__link"><p className="portfolio__signature">Адаптивный сайт</p></a>
                    <a href="http://mesto.mcnad.nomoredomains.club/" target="_blank"className="link portfolio__link"><p className="portfolio__signature">Одностраничное приложение</p></a>
                </nav>
            </div>
        </section>
    )
}