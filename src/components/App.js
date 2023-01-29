import "../App.css";
import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useRouteMatch, useHistory, Router } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

/*секции*/
import Header from "./Header/Header";
import Main from "./Main/Main"
import Movies from "./Movies/Movies"
import Footer from "./Footer/Footer"
import MenuPopup from "./popups/MenuPopup/MenuPopup"
import Sign from "./Sign/Sign"
import Profile from "./Profile/Profile"
import NotFound from "./NotFound/NotFound"



export default function App() {
    let {path, url} = useRouteMatch(); // По факту не используется, но только с ним работает приложение
    const history = useHistory();
    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, swapLoggedIn] = useState(true);
    const [stageMenuPopup, swapStageMenuPopup] = useState(false);

    useEffect(() => {
        history.listen(() => {
            closeAllPopups();
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
    })

    function handleMenuPopup() {
        swapStageMenuPopup(true);
    }

    function closeAllPopups() {
        swapStageMenuPopup(false);
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
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/movie" /> : <Redirect to="/main" />}
                </Route>
                <Route path="/main"><Main></Main></Route>
                <Route path="/sign-in">
                    <Sign
                    textTille="Рады видеть!"
                    textSubmit="Войти"
                    textSignature="Ещё не зарегистрированы?"
                    textLink="Регистрация"
                    />
                </Route>
                <Route path="/sign-up">
                    <Sign
                    textTille="Добро пожаловать!"
                    textSubmit="Зарегистрироваться"
                    textSignature="Уже зарегистрированы?"
                    textLink="Войти"
                    />
                </Route>
                <Route path="/movie"><Movies></Movies></Route>
                <Route path="/saved-movie"><Movies></Movies></Route>
                <Route path="/profile"><Profile></Profile></Route>
                <Route path="*"><NotFound history={history}/></Route>
            </Switch>
            </main>
            {footer ? 
            <Footer />
            : <></>}
            <MenuPopup 
            isOpen={stageMenuPopup} 
            onClose={closeAllPopups}/>      
        </CurrentUserContext.Provider>
    )
}