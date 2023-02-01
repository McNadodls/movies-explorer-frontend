import photo from "../../../images/about-me/photo.jpg";

export default function AboutMe () {
    return(
        <section className="about-me section">
            <div className="section__page section__page_screen_main">
                <h2 className="section__title section__title_theme_white"><a name="student" />Студент</h2>
                <div className="about-me__container">
                    <img className="about-me__photo" src={photo} alt="Личное фото"></img>
                    <div className="about-me__info">
                        <h3 className="about-me__name">Дмитрий</h3>
                        <p className="about-me__signature">Фронтенд-разработчик, 23 лет</p>
                        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a className="about-me__link">Github</a>
                    </div>
                </div>
            </div>
        </section>
    )
}