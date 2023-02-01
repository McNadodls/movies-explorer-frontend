import { Route } from "react-router-dom"
import MoviesCard from "./MoviesCard/MoviesCard"

export default function MoviesCardList () {
    return(
        <section className="films section">
            <div className="section__page section__page_screen_movie">
                <div className="films__container">
                    <MoviesCard name="Бугущий по лезвию" duration="117 мин" liked={true}></MoviesCard>
                    <MoviesCard name="Бугущий по лезвию" duration="117 мин" liked={false}></MoviesCard>
                    <MoviesCard name="Бугущий по лезвию" duration="117 мин" liked={true}></MoviesCard>
                    <MoviesCard name="Бугущий по лезвию" duration="117 мин" liked={false}></MoviesCard>             
                </div>
                <button className="link films__more-btn">Ещё</button>
            </div>
        </section>
    )
}