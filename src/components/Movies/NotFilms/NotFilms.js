import ppHop from "../../../images/films/ppHop.gif"
export default function NotFilms (props) {
    
    return(
        <div className="not-films">
            <h2 className="not-films__title">{props.title}</h2>
            <img className="not-films__image" src={ppHop}></img>
        </div>
    )
}