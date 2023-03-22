import "../App.css";
import React, { useEffect, useState, useMemo } from "react";
import { Route, Redirect, Switch, useRouteMatch, useHistory, Router } from "react-router-dom";

import useFormWithValidation from "../hooks/useFormWithValidation";//Валидация
import Preloader from "./Preloader/Preloader";//Прелоудер
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";//Защита аваторизацией

/*секции*/
import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Footer from "./Footer/Footer";
import MenuPopup from "./popups/MenuPopup/MenuPopup";
import ErrorsPopup from "./popups/ErrorsPopup/ErrorsPopup";
import Sign from "./Sign/Sign";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { sendMovieRequest } from "../store/moviesSlice";
import { getCurentUser } from "../store/signSlice";



export default function App() {
    let {path, url} = useRouteMatch(); // По факту не используется, но только с ним работает приложение
    
    const screenWidth = window.screen.width; //узнатькакое расширение
    const history = useHistory();
    // eslint-disable-next-line no-restricted-globals
    const firstPath = useMemo(() => location.pathname, [])

    const dispatch = useDispatch();

    const statusSign = useSelector(state => state.sign.status);
    const loggedIn = useSelector(state => state.sign.loggedIn);
    const currentUser = useSelector(state => state.sign.currentUser);

    const statusMovie = useSelector(state => state.movies.status);
    const allMovies = useSelector(state => state.movies.allMovies);

    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const [preload, setPreload] = useState(false);
    
    
    const [stageMenuPopup, swapStageMenuPopup] = useState(false);


    const [quantityFilms, setQuantityFilms] = useState(0);

    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

    useEffect(() => {
        const allStatus = [statusSign, statusSign]
        const nowIsLoading = allStatus.some(status => status === "loading"
        )
        setPreload(nowIsLoading);
        
    }, [statusMovie, statusSign])

    //получение фильмов
    useEffect(() => {
        if (loggedIn) {            
            dispatch(sendMovieRequest());
        }
    }, [loggedIn]);

    // //информация о user
    useEffect(() => {
            dispatch(getCurentUser());
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
    return (
        <> 
            {header ? 
            <Header 
            loggedIn={loggedIn} 
            onClickMenu={handleMenuPopup}
            /> 
            : <></>}
            <main className="page">
                <Switch>
                <ProtectedRoute
                    path="/movie"
                    component={Movies}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    history = {history}
                    loggedIn={loggedIn}
                    isCheking={statusSign}
                />
                <ProtectedRoute
                    path="/saved-movie"
                    component={Movies}
                    quantityFilms = {quantityFilms}
                    handleMoreButton = {handleMoreButton}
                    history = {history}
                    loggedIn={loggedIn}
                    isCheking={statusSign}
                />
                <ProtectedRoute 
                    path="/profile"
                    component={Profile}
                    values={values}
                    handleChange={handleChange} 
                    errors={errors}
                    isValid={isValid} 
                    resetForm={resetForm}
                    loggedIn={loggedIn}
                    isCheking={statusSign}
                />
                <ProtectedRoute 
                    exact path="/"
                    component={Movies}
                    loggedIn={loggedIn}
                    isCheking={statusSign}
                />
                <Route path="/main"><Main></Main></Route>
                <Route path="/sign-in">
                    <Sign
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
            <ErrorsPopup />
            {preload ? <Preloader /> : <></>}     
        </>
    )
}