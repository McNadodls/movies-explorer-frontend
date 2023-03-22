import { Link, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Input from "../containers/Input/Input";
import Form from "../containers/Form/Form";

import {useDispatch} from "react-redux";
import {handleSubmitSingIn, handleSubmitSignUp} from "../../store/signSlice"


export default function Sign({values, handleChange, errors, resetForm, isValid, textTille, textSubmit, textSignature, textLink, history}) {

    const dispatch = useDispatch();

    const {input__userName, input__userEmail, input__userPass} = values;

     function onSubmit (e) {
        e.preventDefault();

        (async function () {
            if (history.location.pathname === '/sign-up') {
                dispatch(await handleSubmitSignUp({input__userName, input__userEmail, input__userPass}));
                console.log(values.input__userName, values.input__userEmail, values.input__userPass);
            } else {
                dispatch(await handleSubmitSingIn({input__userEmail, input__userPass}));
    
                console.log(values.input__userEmail, values.input__userPass);
            }
            history.push('/movie');
            e.target.closest("form").reset();
            resetForm();
        })()
    }
    return(
        <section className="sign section">
            <div className="section__page section__page_screen_info">
                <div className="sign__container">
                    <Link to="/main" className="link sign__logo" />
                    <h2 className="sign__title">{textTille}</h2>
                    <Form className="sign__form" onSubmit={onSubmit}>
                        <div className="sign__input-container">
                            <Route path={"/sign-up"}>
                                <label className="sign__label" htmlFor="input__userName" >Имя</label>
                                <Input
                                    handleChange={handleChange}
                                    errMassage={errors.input__userName}
                                    classNameInput="sing__input"
                                    classNameErr="sing__error" 
                                    valueInput={values.input__userName}

                                    id="input__userName" 
                                    name="input__userName" 
                                    type="text"
                                    minLength="2"
                                    maxLength="30"
                                    isSpan={true}
                                    required
                                />
                            </Route>
                            <label className="sign__label" htmlFor="input__userEmail">E-mail</label>
                            <Input
                                handleChange={handleChange}
                                errMassage={errors.input__userEmail}
                                classNameInput="sing__input"
                                classNameErr="sing__error"
                                valueInput={values.input__userEmail}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"

                                id="input__userEmail" 
                                name="input__userEmail"
                                type="email"
                                minLength="2"
                                maxLength="30"
                                isSpan={true}
                                required
                            />
                            <label className="sign__label" htmlFor="input__userPass">Пароль</label>
                            <Input
                                handleChange={handleChange}
                                errMassage={errors.input__userPass}
                                classNameInput="sing__input"
                                classNameErr="sing__error"
                                valueInput={values.input__userPass}

                                id="input__userPass" 
                                name="input__userPass"
                                type="password"
                                minLength="2"
                                maxLength="30"
                                isSpan={true}
                                required
                            />
                        </div>
                        <div className="sign__btn-container">
                            <button className={isValid ? "link form__submit form__submit_active" : "form__submit"} disabled={!isValid? true : false}>{textSubmit}</button>
                            <p className="sign__signature">{textSignature}</p>
                            <Route path={"/sign-in"}><Link className="link sign__link" to="/sign-up">{textLink}</Link></Route>
                            <Route path={"/sign-up"}><Link className="link sign__link" to="/sign-in">{textLink}</Link></Route>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
}