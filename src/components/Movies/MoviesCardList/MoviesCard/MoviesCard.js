import { Route } from "react-router-dom"
import image from "../../../../images/card/daneumeronvkoncedraiva.jpg"

export default function MoviesCard ({name, duration, liked}) {
    return(
        <div className="card">
            <div className="card__title">
                <h3 className="card__name">{name}</h3>
                <p className="card__duration">{duration}</p>
            </div>
            <img className="card__image" src={image} alt="ryan gosling rage"></img>
            {!liked ? 
            <button className="link card__button">Сохранить</button>
            :
            <>
            <Route path="/movie"><button className="link card__button card__button_status_liked"></button></Route>
            <Route path="/saved-movie"><button className="link card__button card__button_status_saved"></button></Route>
            </>
            }
        </div>
    )
}