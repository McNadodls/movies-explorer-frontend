import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Redirect, Switch, useRouteMatch, useHistory, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleSaveMovie, handleDeleteMovie } from "../../store/moviesSlice";

export default function Movies({quantityFilms, handleMoreButton, history}) {

    
    const dispatch = useDispatch();
    const allMovies = useSelector(state => state.movies.allMovies);
    const savedMovies = useSelector(state => state.movies.savedMovies);
    const foundedMovies = useSelector(state => state.movies.foundedMovies);
    const savedFoundedMovies = useSelector(state => state.movies.savedFoundedMovies);

    function saveMovie (movieInfo) {
        dispatch(handleSaveMovie(movieInfo));
    }

    function deleteMovie (id) {
        dispatch(handleDeleteMovie(id));
    }

    return (
        <div className="movies">
            <SearchForm
                history = {history}
            />
            <Route path="/movie">
                <MoviesCardList 
                    movies = {allMovies}
                    moviesFounded = {foundedMovies}
                    savedMovies = {savedMovies}
                    handleSavedMovie = {saveMovie}
                    handleDeleteMovie = {deleteMovie}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    noMovieTitle = "На сайте всего 100 фильмов, попробуй собрать их всех в сохранные. Для поиска фильмов используй поле поиска"
                />
            </Route>
            <Route path="/saved-movie">
                <MoviesCardList 
                    movies = {savedMovies}
                    moviesFounded = {savedFoundedMovies}
                    savedMovies = {savedMovies}
                    handleSavedMovie = {saveMovie}
                    handleDeleteMovie = {deleteMovie}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    noMovieTitle = "Нет сохраненных фильмов"
                />
            </Route>
        </div>
    )
}