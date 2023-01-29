export default function Promo () {
    return(
        <section className="promo section">
            <div className="section__page section__page_screen_main">
                <h2 className="section__title section__title_theme_white">О проекте</h2>
                <div className="stages">
                    <div className="stages__item">
                        <h3 className="stages__title">Дипломный проект включал 5 этапов</h3>
                        <p className="stages__signature">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="stages__item">
                        <h3 className="stages__title">На выполнение диплома ушло 5 недель</h3>
                        <p className="stages__signature">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="deadline">
                    <p className="deadline__part deadline__part_theme_green">1 неделя</p>
                    <p className="deadline__part deadline__part_theme_gray">4 недели</p>
                    <p className="deadline__signature">Back-end</p>
                    <p className="deadline__signature">Front-end</p>
                </div>
            </div>
        </section>
    )
}