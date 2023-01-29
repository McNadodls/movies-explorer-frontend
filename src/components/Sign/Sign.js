import { Link, Route } from "react-router-dom";
import React from "react";
import Input from "../containers/Input/Input";
import logo from "../../images/header/logo/logo.svg"

export default function Sign({textTille, textSubmit, textSignature, textLink}) {
    return (
        <section className="sign section">
            <div className="section__page section__page_screen_info">
                <div className="sign__container">
                    <img className="sign__logo" src={logo} alt="Логотип" />
                    <h2 className="sign__title">{textTille}</h2>
                    <form className="sign__form">
                        <div className="sign__input-container">
                            <Route path={"/sign-up"}>
                                <label className="sign__label" htmlFor="input__userName">Имя</label>
                                <Input className="input sing__input" id="input__userName" name="input__userName" />
                            </Route>
                            <label className="sign__label" htmlFor="input__userEmail">E-mail</label>
                            <Input className="input sing__input" id="input__userEmail" name="input__userEmail"/>

                            <label className="sign__label" htmlFor="input__userPass">Пароль</label>
                            <Input className="input sing__input" id="input__userPass" name="input__userPass"/>
                        </div>
                        <div className="sign__btn-container">
                            <button className="link sign__submit">{textSubmit}</button>
                            <p className="sign__signature">{textSignature}</p>
                            <Route path={"/sign-in"}><Link className="link sign__link" to="/sign-up">{textLink}</Link></Route>
                            <Route path={"/sign-up"}><Link className="link sign__link" to="/sign-in">{textLink}</Link></Route>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}