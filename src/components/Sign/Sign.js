import { Link, Route } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Input from "../containers/Input/Input";
import Form from "../containers/Form/Form";

import {useDispatch, useSelector} from "react-redux";
import {handleSubmitSingIn, handleSubmitSignUp} from "../../store/signSlice"


export default function Sign({textTille, textSubmit, textSignature, textLink, history}) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.sign.currentUser);

    const form = useRef();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);

    function onSubmit (e) {
        e.preventDefault();
        if (history.location.pathname === '/sign-up') {
            dispatch(handleSubmitSignUp({name, email, pass}));
            console.log(name, email, pass);
        } else {
            dispatch(handleSubmitSingIn({email, pass}));
            console.log(email, pass);
        }
    }
    
    useEffect(() => {
        if (currentUser.token) {
            history.push('/movie');
        }
    }, [currentUser.token]);

    useEffect(() => {
        if (form.current.checkValidity()) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }, [email, pass, name, history.location.pathname]);

    return(
        <section className="sign section">
            <div className="section__page section__page_screen_info">
                <div className="sign__container">
                    <Link to="/main" className="link sign__logo" />
                    <h2 className="sign__title">{textTille}</h2>
                    <form ref={form} className="sign__form" onSubmit={onSubmit} noValidate>
                        <div className="sign__input-container">
                            <Route path={"/sign-up"}>
                                <label className="sign__label" htmlFor="input__userName" >Имя</label>
                                <Input
                                    valueInput={name}
                                    handleChange={(e) => {setName(e.target.value)}}
                                    classNameInput="sing__input"
                                    classNameErr="sing__error" 
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
                                valueInput={email}
                                handleChange={(e) => {setEmail(e.target.value)}}
                                classNameInput="sing__input"
                                classNameErr="sing__error"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.(ru|com)"

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
                                valueInput={pass}
                                handleChange={(e) => {setPass(e.target.value)}}
                                classNameInput="sing__input"
                                classNameErr="sing__error"
                                
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
                    </form>
                </div>
            </div>
        </section>
    )
}