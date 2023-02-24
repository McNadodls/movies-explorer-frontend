import magnifier from "../../../images/search-form/magnifier.svg"
import Input from "../../containers/Input/Input"
import Form from "../../containers/Form/Form";
import React, { useEffect, useState } from "react";

export default function SearchForm ({allMovies, savedMovies, foundedMovies, savedFoundedMovies, onSearch, history, onClear}) {
    
    const [isShorts, setIsShorts] = useState(false);
    const [queryValue, setQueryValue] = useState("");

    useEffect(() => {
        console.log(queryValue);
        console.log(isShorts);
    }, [isShorts, queryValue])

    function handleSearch(e) {
        e.preventDefault();
        console.log(JSON.parse(localStorage.getItem('foundedMovies')))
        console.log(JSON.parse(sessionStorage.getItem('savedFoundedMovies')))
        if (queryValue === "" && !isShorts) {
            onClear();
        } else if (history.location.pathname === '/movie') {
            onSearch(allMovies, queryValue, isShorts, false);
        } else {
            onSearch(savedMovies, queryValue, isShorts, true);
        }
    }

    useEffect(() => {
        if (history.location.pathname === '/movie' && foundedMovies) {
            setQueryValue(foundedMovies.query);
            setIsShorts(foundedMovies.isShorts);
        } else if (history.location.pathname === '/saved-movie' &&  savedFoundedMovies) {
          /*Храним только в текущей сессии, если есть найденные сохраненные фильмы*/
            setQueryValue(savedFoundedMovies.query);
            setIsShorts(savedFoundedMovies.isShorts);
        } else {
            setQueryValue('');
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
                            onChange = {(e) => {setQueryValue(e.target.value)}}
                            value = {queryValue}
                            className="input search-form__input" 
                            placeholder="Фильм"
                            required
                        />
                        <button className="link search-form__submit">Найти</button>
                    </div>
                    <div class="search-form__filter">
                        <input onChange={(e) => {setIsShorts(!isShorts)}} checked={isShorts} value={isShorts} type="checkbox" id="search-form__checkbox" class="search-form__checkbox" />
                        <label htmlFor="search-form__checkbox" class="search-form__label">Короткометражки</label>
                    </div>
                </Form>
            </div>
        </section>
    )
}