import "../App.css";
import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useRouteMatch, useHistory, Router } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import useFormWithValidation from "../hooks/useFormWithValidation";//Валидация
import Preloader from "./Preloader/Preloader";//Прелоудер
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";//Защита аваторизацией

/*секции*/
import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Footer from "./Footer/Footer";
import MenuPopup from "./popups/MenuPopup/MenuPopup";
import Sign from "./Sign/Sign";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";

/*API*/
import MoviesApi from "../utils/MoviesApi";
import MainApi from "../utils/MainApi";



export default function App() {
    let {path, url} = useRouteMatch(); // По факту не используется, но только с ним работает приложение
    const screenWidth = window.screen.width; //узнатькакое расширение
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});

    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const [preload, setPreload] = useState(false);
    
    const [loggedIn, swapLoggedIn] = useState(false);
    const [stageMenuPopup, swapStageMenuPopup] = useState(false);

    const [allMovies, setAllMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);


    const [quantityFilms, setQuantityFilms] = useState(0);

    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

    //получение фильмов
    useEffect(() => {
        if (loggedIn) {
            //все фильмы
            if (!(localStorage.getItem('movies'))) {//если нет данных то запрашиваем
                setPreload(true);
                MoviesApi.getMovies()
                    .then((res) => { //так как поступающая информация с сервера яндекса отличается от той что мы будем использовать, заменяем массив на тот что нам нужен
                        let allFilms = res.map((elem) => {return {
                            "country": elem.country,
                            "director": elem.director,
                            "duration": elem.duration,
                            "year": elem.year,
                            "description": elem.description,
                            "image": `https://api.nomoreparties.co${elem.image.url}`,
                            "trailerLink": elem.trailerLink,
                            "thumbnail": `https://api.nomoreparties.co${elem.image.formats.thumbnail.url}`,
                            "movieId": elem.id,
                            "nameRU": elem.nameRU,
                            "nameEN": elem.nameEN,
                            }})
                            localStorage.setItem('movies', JSON.stringify(allFilms));
                            setAllMovies(allFilms);

                            console.log(JSON.parse(localStorage.getItem('movies')))
                    }).catch((err) => {console.log(err)
                    }).finally(() => {setPreload(false)})
            }
            //сохраненные фильмы
            MainApi.getSavedMovie()
                .then((res) => {
                    setPreload(true);
                    setSavedMovies(res);
                    setAllMovies(JSON.parse(localStorage.getItem('movies')));
                }).catch((err) => {console.log(err)
                }).finally(() => {setPreload(false)})
        }
    }, [loggedIn]);

    // //информация о user
    useEffect(() => {
        if(!loggedIn) {
            setPreload(true);
            MainApi.getCurentUser().then((res) => {
                console.log(res)
                setCurrentUser(res);
                swapLoggedIn(true);
                history.push('/movie');
            }).catch((err) => {console.log(err)
           }).finally(() => {setPreload(false)});
        }
    }, []);

    //отрисовка хедера и футера на странице
    useEffect(() => {
        history.listen(() => {
            closeAllPopups();
            resetForm();
            if (history.location.pathname === '/sign-in' || history.location.pathname === '/sign-up') {
                setHeader(false);
                setFooter(false);
              } else if (history.location.pathname === '/profile') {
                setHeader(true);
                setFooter(false);
              } else {
                setHeader(true);
                setFooter(true);
              }
        })
    }, [history.location.pathname]);

    //количество фильов на странице
    useEffect(() => { 
        if (screenWidth < 576) {
        setQuantityFilms(5);
        } else if (screenWidth < 768) {
        setQuantityFilms(8);
        } else {
        setQuantityFilms(12);
        }
    }, []);

    //Кнопка еще
    function handleMoreButton() {
        if (screenWidth > 1280) {
            setQuantityFilms(quantityFilms + 3);
        } else {
            setQuantityFilms(quantityFilms + 2);
        }
    }

    //открыть попап меню
    function handleMenuPopup() {
        swapStageMenuPopup(true);
    }

    //закрыть попап меню
    function closeAllPopups() {
        swapStageMenuPopup(false);
    }

    //регистрация
    function handleSubmitSignUp(name, email, password) {
        MainApi.signup(name, email, password)
        .then((res) => {
            console.log(res);
            history.push("/sign-in");
        })
        .catch((err) => {console.log(err)})
    }

    //логин
    function handleSubmitSingIn(email, password) {
        console.log(email, password)
        MainApi.signin(email, password)
        .then((res) => {
            console.log(res);
            swapLoggedIn(true);
            setCurrentUser(res);
            history.push("/movie");
        })
        .catch((err) => {console.log(err)})
    }

    //изменение пользователя
    function handleUpdateUser(name, email) {
        setPreload(true);
        MainApi.updateUser(name, email)
        .then((res) => {
            console.log(res);
            setCurrentUser(res);
            history.push('/');
        }).catch((err) => {console.log(err)
        }).finally(() => {setPreload(false)});
    }

    //выход
    function handleLogOut() {
        MainApi.logout()
        .then((res) => {
            console.log(res);
            swapLoggedIn(false);
            setCurrentUser({});
            history.push("/sign-in");
            localStorage.removeItem('movies');
            localStorage.removeItem('foundedMovies');
            localStorage.removeItem('savedFoundedMovies');
        })
        .catch((err) => {console.log(err)})
    }

    //сохранить фильм
    function handleSavedMovie(movieInfo) {
        MainApi.saveMovie(movieInfo)
        .then((res) => {
            console.log(res);
            setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => {console.log(err)})
    }

    //удалить из сохраненных
    function handleDeleteMovie(id) {
        MainApi.deleteSavedMovie(id)
        .then((res) => {
            setSavedMovies(savedMovies.filter((elem) => elem.movieId !== res.movieId ? elem : false))
            if (sessionStorage.getItem('savedFoundedMovies')) {
                console.log("ы")
                const savedFoundedMovies = JSON.parse(sessionStorage.getItem('savedFoundedMovies'));
                savedFoundedMovies.movies = savedFoundedMovies.movies.filter((elem) => elem.movieId !== res.movieId ? elem : false)
                sessionStorage.setItem('savedFoundedMovies', JSON.stringify(savedFoundedMovies));
            }
        })
        .catch((err) => {console.log(err)}).finally((res) => {return Promise.resolve("Success")})
    }

    return (
        <CurrentUserContext.Provider value={currentUser}> 
            {header ? 
            <Header 
            loggedIn={loggedIn} 
            onClickMenu={handleMenuPopup}
            /> 
            : <></>}
            <main className="page">
                <Switch>
                <ProtectedRoute
                    path={["/movie", "/saved-movie"]}
                    component={Movies}
                    allMovies = {allMovies}
                    savedMovies = {savedMovies}
                    // onSearch = {handleSearchMovie}
                    handleSavedMovie = {handleSavedMovie}
                    handleDeleteMovie = {handleDeleteMovie}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    history = {history}
                    loggedIn={loggedIn}
                    setPreload = {setPreload}
                />
                <ProtectedRoute 
                    path="/profile"
                    component={Profile}
                    handleLogOut={handleLogOut}
                    handleUpdateUser={handleUpdateUser}
                    values={values}
                    handleChange={handleChange} 
                    errors={errors}
                    isValid={isValid} 
                    resetForm={resetForm}
                    loggedIn={loggedIn}
                />
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/movie" /> : <Redirect to="/main" />}
                </Route>
                <Route path="/main"><Main></Main></Route>
                <Route path="/sign-in">
                    <Sign
                        handleSubmit={handleSubmitSingIn}
                        values={values}
                        handleChange={handleChange} 
                        errors={errors}
                        isValid={isValid}
                        resetForm={resetForm}
                        history={history}
                        textTille="Рады видеть!"
                        textSubmit="Войти"
                        textSignature="Ещё не зарегистрированы?"
                        textLink="Регистрация"
                    />
                </Route>
                <Route path="/sign-up">
                    <Sign
                        handleSubmit={handleSubmitSignUp}
                        values={values}
                        handleChange={handleChange} 
                        errors={errors}
                        isValid={isValid}
                        history={history}
                        resetForm={resetForm}
                        textTille="Добро пожаловать!"
                        textSubmit="Зарегистрироваться"
                        textSignature="Уже зарегистрированы?"
                        textLink="Войти"
                    />
                </Route>
                <Route path="*"><NotFound history={history}/></Route>
            </Switch>
            </main>
            {footer ? 
            <Footer />
            : <></>}
            <MenuPopup 
            isOpen={stageMenuPopup} 
            onClose={closeAllPopups}/>
            {preload ? <Preloader /> : <></>}     
        </CurrentUserContext.Provider>
    )
}