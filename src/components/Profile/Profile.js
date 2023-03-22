import { Link, Route } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Input from "../containers/Input/Input";
import Form from "../containers/Form/Form";

import {useDispatch, useSelector} from "react-redux"
import {handleUpdateUser, handleLogOut} from "../../store/signSlice"
import {clearMovie} from "../../store/moviesSlice"

export default function Profile({values, handleChange, errors, isValid, resetForm}) {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.sign.currentUser);

    const {input__profoleName, input__profoleEmail} = values;

    const [editForm, setEditForm] = useState(false);

    function cancelEditForm (e) {
        e.preventDefault(); 
        setEditForm(false);
        e.target.closest("form").reset();
        resetForm();
    }

    function onSubmit (e) {
        e.preventDefault();
        dispatch(handleUpdateUser({input__profoleName, input__profoleEmail}));
        setEditForm(false);
        // e.target.closest("form").reset();
        resetForm();
    }

    function logOut (e) {
        e.preventDefault();
        dispatch(handleLogOut());
        dispatch(clearMovie());
        e.target.closest("form").reset();
        resetForm();
    }

    return (
        <section className="profile section">
            <div className="section__page section__page_screen_info">
                <div className="profile__container">
                    <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
                    <Form className="profile__form" onSubmit={onSubmit}>
                        <div className="profile__input-container">
                            <fieldset className="profile__fieldset">
                                <label className="profile__label" htmlFor="input__profoleName">Имя</label>
                                <Input
                                    handleChange={handleChange}
                                    errMassage={errors.input__profoleName}
                                    classNameInput="profile__input"
                                    classNameErr="profile__error"
                                    
                                    defaultValue={currentUser.name}
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
                                    handleChange={handleChange}
                                    errMassage={errors.input__profoleEmail}
                                    classNameInput="profile__input"
                                    classNameErr="profile__error"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"

                                    defaultValue={currentUser.email}
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
                    </Form>
                </div>
            </div>
        </section>
    )
}