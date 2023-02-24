import React, { useState, useEffect} from "react";
import { Route } from "react-router-dom";


export default function MoviesCard ({filmInfo, savedMovies, handleSavedMovie, handleDeleteMovie}) {

    const [isSaved, setIsSaved] = useState(false)
    const btnSavedClasses = ['link card__button'];

    useEffect(() => {
        savedMovies.forEach((movie) => {
          if (movie.movieId === filmInfo.movieId) {
            setIsSaved(true);
          }
        })
      }, [savedMovies]);

    function mathTime(duration) {
        return `${duration/60 > 0 ? `${Math.floor(duration/60)} ч ${duration%60 === 0 ? '' : `${duration - Math.floor(duration/60)*60} м`}` : `${duration} м`}`
    }

    function isOverflowed (text) {
        if (text.length > 27) {
            return true
        } else {
            return false
        }
    }

    function handleIsSaved(e) {
        if (!isSaved) {
            setIsSaved(true);
            console.log(`лакнул ${filmInfo.nameRU}`);
            handleSavedMovie(filmInfo)
        } else {
            setIsSaved(false);
            handleDelSaved(e)
        }
    }

    function handleDelSaved(e) {
        let mongoMovieId;
        savedMovies.forEach((movie) => {
          if (movie.movieId === filmInfo.movieId) {
            mongoMovieId = movie._id;
          }
        })
        console.log(`D: ${filmInfo.nameRU}`)
        handleDeleteMovie(mongoMovieId)
    }

    if (isSaved) {
        btnSavedClasses.push('card__button_status_liked');
    }

    return(
        <div className="card">
            <div className="card__title">
                <h3 className={isOverflowed(filmInfo.nameRU) ? "card__name card__name_overflowed": "card__name"}><span>{filmInfo.nameRU}</span></h3>
                <p className="card__duration">{mathTime(filmInfo.duration)}</p>
            </div>
            <a href={filmInfo.trailerLink} target="_blank" className="link">
                <img className="card__image" src={filmInfo.image} alt={filmInfo.nameRU}></img>
            </a>
            <Route path="/movie"><button onClick={handleIsSaved} type="button" className={btnSavedClasses.join(' ')}>{!isSaved ? "Сохранить": ""}</button></Route>
            <Route path="/saved-movie"><button onClick={handleDelSaved} type="button" className="link card__button card__button_status_saved"></button></Route>
        </div>
    )
}