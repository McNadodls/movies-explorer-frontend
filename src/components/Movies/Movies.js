import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import React, { useEffect, useMemo, useState } from "react";
import { Route, Redirect, Switch, useRouteMatch, useHistory, Router } from "react-router-dom";


export default function Movies({allMovies, savedMovies, quantityFilms, handleMoreButton, handleSavedMovie, handleDeleteMovie, history, setPreload}) {

    const [foundedMovies, setFoundedMovies] = useState(JSON.parse(localStorage.getItem('foundedMovies')));
    const [savedFoundedMovies, setSavedFoundedMovies] = useState(JSON.parse(sessionStorage.getItem('savedFoundedMovies')));
    
    function handleFoundMovies(arrMovies, queryValue, isShorts) {
        console.log(arrMovies);
        return arrMovies.filter((movie) => {
            return movie.nameRU.toUpperCase().includes(queryValue.toUpperCase()) && !isShorts ? movie
            : movie.nameRU.toUpperCase().includes(queryValue.toUpperCase()) && isShorts && movie.duration <= 40
              ? movie : false
        })
    }

    function handleSearchMovie(arrMovies, queryValue, isShorts, isSave) {
        console.log(allMovies)
        setPreload(true);
        const foundMovies = handleFoundMovies(arrMovies, queryValue, isShorts);
        if (!isSave) {
            localStorage.setItem('foundedMovies', JSON.stringify({
                movies: foundMovies,
                query: queryValue,
                isShorts: isShorts,
              }))
            setFoundedMovies(JSON.parse(localStorage.getItem('foundedMovies')))
        } else {
            sessionStorage.setItem('savedFoundedMovies', JSON.stringify({
                movies: foundMovies,
                query: queryValue,
                isShorts: isShorts,
              }))
            setSavedFoundedMovies(JSON.parse(sessionStorage.getItem('savedFoundedMovies')))
        }
        setPreload(false);
    }

    function clearSearch() {
        if (history.location.pathname === '/movies') {
          localStorage.removeItem('foundedMovies');
          setFoundedMovies(null)
        } else {
          sessionStorage.removeItem('savedFoundedMovies');
          setSavedFoundedMovies(null)
        }
    }

    function deleteMovie (id) {
        handleDeleteMovie(id)
            .then((res) => {setSavedFoundedMovies(JSON.parse(sessionStorage.getItem('savedFoundedMovies')))})
    }
    
    const renderMovie = useMemo(() =>{
        return history.location.pathname === '/movie'? 
            foundedMovies ? foundedMovies.movies : []
            : savedFoundedMovies ? savedFoundedMovies.movies : savedMovies
    }, [history.location.pathname, allMovies, savedMovies, foundedMovies, savedFoundedMovies])

    return (
        <div className="movies">
            <SearchForm 
                allMovies = {allMovies}
                savedMovies = {savedMovies}
                foundedMovies = {foundedMovies}
                savedFoundedMovies = {savedFoundedMovies}
                onSearch = {handleSearchMovie}
                onClear = {clearSearch}
                history = {history}
            />
            <Route path="/movie">
                <MoviesCardList 
                    movies = {renderMovie}
                    savedMovies = {savedMovies}
                    handleSavedMovie = {handleSavedMovie}
                    handleDeleteMovie = {deleteMovie}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    noMovieTitle = "На сайте всего 100 фильмов, попробуй собрать их всех в сохранные. Для поиска фильмов используй поле поиска"
                />
            </Route>
            <Route path="/saved-movie">
                <MoviesCardList 
                    movies = {renderMovie}
                    savedMovies = {savedMovies}
                    handleSavedMovie = {handleSavedMovie}
                    handleDeleteMovie = {deleteMovie}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    noMovieTitle = "Нет сохраненных фильмов"
                />
            </Route>
        </div>
    )
}