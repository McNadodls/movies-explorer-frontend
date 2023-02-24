import { Route } from "react-router-dom"
import MoviesCard from "./MoviesCard/MoviesCard"
import NotFilms from "../NotFilms/NotFilms"


export default function MoviesCardList ({movies, savedMovies, quantityFilms, handleMoreButton, handleSavedMovie, handleDeleteMovie, noMovieTitle}) {
    
    return(
        <section className="films section">
            <div className="section__page section__page_screen_movie">
                {movies !== null || undefined ?
                    <>
                        {movies.length !== 0 ?
                            <div className="films__container">
                                {movies.map((movies, index) => 
                                    index < quantityFilms && (
                                    <MoviesCard 
                                    filmInfo = {movies} 
                                    savedMovies = {savedMovies}
                                    handleSavedMovie = {handleSavedMovie}
                                    handleDeleteMovie = {handleDeleteMovie}
                                    />
                                ))}
                            </div>
                        :
                            <NotFilms title={noMovieTitle}/>
                        }
                        {
                        movies.length <= quantityFilms
                        ? <></>
                        :
                        <button onClick={handleMoreButton} className="link films__more-btn">Ещё</button>
                        }
                    </>
                :<></>}
            </div>
        </section>
    )
}