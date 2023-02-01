export default function Techs () {
    return(
        <section className="techs section">
            <div className="section__page section__page_screen_main">
                <h2 className="section__title section__title_theme_white"><a name="techs" />Технологии</h2>
                <div className="techs__container">
                    <h3 className="techs__title">7 технологий</h3>
                    <p className="techs__signature">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                    <div className="tech-grid">
                        <p className="tech-grid__elem">HTML</p>
                        <p className="tech-grid__elem">CSS</p>
                        <p className="tech-grid__elem">JS</p>
                        <p className="tech-grid__elem">React</p>
                        <p className="tech-grid__elem">Git</p>
                        <p className="tech-grid__elem">Express.js</p>
                        <p className="tech-grid__elem">mongoDB</p>
                    </div>
                </div>
            </div>
        </section>
    )
}