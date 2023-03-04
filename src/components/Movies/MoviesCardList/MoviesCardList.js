import { Route } from "react-router-dom"
import MoviesCard from "./MoviesCard/MoviesCard"
import NotFilms from "../NotFilms/NotFilms"
import React, { useEffect, useMemo, useState } from "react";



export default function MoviesCardList ({movies, moviesFounded, savedMovies, quantityFilms, handleMoreButton, handleSavedMovie, handleDeleteMovie, noMovieTitle}) {
    
    const renderMovie = useMemo(() =>{
            return moviesFounded !== null || undefined ? moviesFounded.movies : movies
    }, [movies, moviesFounded])

    return(
        <section className="films section">
            <div className="section__page section__page_screen_movie">
                {renderMovie !== null || undefined ?
                    <>
                        {renderMovie.length !== 0 ?
                            <div className="films__container">
                                {renderMovie.map((movie, index) => 
                                    index < quantityFilms && (
                                    <MoviesCard 
                                    filmInfo = {movie}
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
                        renderMovie.length <= quantityFilms
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