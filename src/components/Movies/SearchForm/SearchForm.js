import magnifier from "../../../images/search-form/magnifier.svg"
import Input from "../../containers/Input/Input"
import Form from "../../containers/Form/Form";
import React, { useEffect, useState } from "react";

import {useSelector, useDispatch} from "react-redux";
import {handleSearchMovie, clearFoundedMovies} from "../../../store/moviesSlice"

export default function SearchForm ({history}) {

    const dispatch = useDispatch();
    const allMovies = useSelector(state => state.movies.allMovies);
    const savedMovies = useSelector(state => state.movies.savedMovies);
    const foundedMovies = useSelector(state => state.movies.foundedMovies);
    const savedFoundedMovies = useSelector(state => state.movies.savedFoundedMovies);
    
    const [isShorts, setIsShorts] = useState(false);
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        search(isShorts);
      }
    
      function handleChangeShorts (e) {
        setIsShorts(!isShorts);
        search(!isShorts);
      }

    function search(isShorts) {
        if (query === "" && !isShorts) {
            onClear();
        } else if (history.location.pathname === '/movie') {
            dispatch(handleSearchMovie({isSave: false, query, isShorts}));
        } else {
            dispatch(handleSearchMovie({isSave: true, query, isShorts}));
        }
    }

    function onClear() {
        if (history.location.pathname === '/movie') {
            dispatch(clearFoundedMovies(false));
        } else {
            dispatch(clearFoundedMovies(true));
        }
    }

    useEffect(() => {
        if (history.location.pathname === '/movie' && foundedMovies) {
            setQuery(foundedMovies.query);
            setIsShorts(foundedMovies.isShorts);
        } else if (history.location.pathname === '/saved-movie' &&  savedFoundedMovies) {
          /*Храним только в текущей сессии, если есть найденные сохраненные фильмы*/
            setQuery(savedFoundedMovies.query);
            setIsShorts(savedFoundedMovies.isShorts);
        } else {
            setQuery('');
            setIsShorts(false);
        }
      }, [history.location.pathname])

    return(
        <section className="search-form section">
            <div className="section__page section__page_screen_movie">
                <Form onSubmit={handleSearch} className="search-form__form">
                    <div className="search-form__container">
                        <img className="search-form__image" src={magnifier} alt="Поиск"/>
                        <Input 
                            onChange = {(e) => {setQuery(e.target.value)}}
                            value = {query}
                            className="input search-form__input" 
                            placeholder="Фильм"
                            required
                        />
                        <button className="link search-form__submit">Найти</button>
                    </div>
                    <div class="search-form__filter">
                        <input onChange={handleChangeShorts} checked={isShorts} value={isShorts} type="checkbox" id="search-form__checkbox" class="search-form__checkbox" />
                        <label htmlFor="search-form__checkbox" class="search-form__label">Короткометражки</label>
                    </div>
                </Form>
            </div>
        </section>
    )
}