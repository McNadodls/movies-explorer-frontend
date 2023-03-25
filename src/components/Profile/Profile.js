import { Link, Route } from "react-router-dom";
import React, { useEffect, useState, useMemo, useRef} from "react";
import Input from "../containers/Input/Input";
import Form from "../containers/Form/Form";

import {useDispatch, useSelector} from "react-redux"
import {handleUpdateUser, handleLogOut} from "../../store/signSlice"
import {clearMovie} from "../../store/moviesSlice"

export default function Profile() {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.sign.currentUser);
    const status = useSelector(state => state.sign.status);

    const form = useRef();

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isValid, setIsValid] = useState(false);

    const [editForm, setEditForm] = useState(false);

    function cancelEditForm (e) {
        e.preventDefault(); 
        setEditForm(false);
        // e.target.closest("form").reset();
        // resetForm();
    }

    async function onSubmit (e) {
        e.preventDefault();
        await dispatch(handleUpdateUser({name, email}));
        console.log(status); 
        // setEditForm(false);
        // e.target.closest("form").reset();
        // resetForm();
    }
    console.log(editForm)

    function logOut (e) {
        e.preventDefault();
        dispatch(handleLogOut());
        dispatch(clearMovie());
        // e.target.closest("form").reset();
        // resetForm();
    }

    useEffect(() => {
        if (form.current.checkValidity() && (name !== currentUser.name || email !== currentUser.email)) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
    }, [email, name]);


    return (
        <section className="profile section">
            <div className="section__page section__page_screen_info">
                <div className="profile__container">
                    <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
                    <form ref={form} className="profile__form" onSubmit={onSubmit} noValidate>
                        <div className="profile__input-container">
                            <fieldset className="profile__fieldset">
                                <label className="profile__label" htmlFor="input__profoleName">Имя</label>
                                <Input
                                    valueInput={name}
                                    handleChange={(e) => {setName(e.target.value)}}
                                    classNameInput="profile__input"
                                    classNameErr="profile__error"
                                    
                                    id="input__profoleName" 
                                    name="input__profoleName"
                                    type="text"
                                    minLength="2"
                                    maxLength="30"
                                    isSpan={true}
                                    disabled={!editForm? true: false}
                                    required
                                />
                            </fieldset>
                            <fieldset className="profile__fieldset">
                                <label className="profile__label" htmlFor="input__profoleEmail">E-mail</label>
                                <Input
                                    valueInput={email}
                                    handleChange={(e) => {setEmail(e.target.value)}}
                                    classNameInput="profile__input"
                                    classNameErr="profile__error"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.(ru|com)"
                                    id="input__profoleEmail" 
                                    name="input__profoleEmail"
                                    type="email"
                                    minLength="2"
                                    maxLength="30"
                                    isSpan={true}
                                    disabled={!editForm? true: false}
                                    required
                                />
                            </fieldset>
                        </div>
                        <div className="profile__btn-container">
                            {!editForm ?
                            <>
                                <button type="button" onClick={(e) => {e.preventDefault(); setEditForm(true)}} className="link profile__edit">Редактировать</button>
                                <button type="button" onClick={logOut} className="link profile__exit">Выйти из аккаунта</button>
                            </>
                            :
                            <>
                                <button type="submit" className={isValid ? "link form__submit form__submit_active" : "form__submit"} disabled={!isValid? true : false}>Сохранить</button>
                                <button type="button" className="link profile__exit" onClick={cancelEditForm}>Отмена</button>
                            </>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}