import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { clearSignErr } from "../../../store/signSlice";
import { clearMovieErr } from "../../../store/moviesSlice";

export default function ErrorsPopup() {
    const dispatch = useDispatch();

    const errorSign = useSelector(state => state.sign.error);
    const errorMovie = useSelector(state => state.movies.error);
    const [arrErors, setArrErors] = useState([]);

    useEffect(() =>{
        if(errorSign != null){
            setArrErors([errorSign, ...arrErors])
            dispatch(clearSignErr())
        }
        if(errorMovie != null){
            setArrErors([errorMovie, ...arrErors])
            dispatch(clearMovieErr())
        }
    }, [errorSign, errorMovie])
    
    function onClose (e) {
        e.preventDefault();
        setArrErors(arrErors.filter((err, index) => {
            if (`err${index}` === e.target.id) {
                return(null)
            }else{
            return(err)}}))
    }

    return (
        <div className="errors-popup">
            <ul className="errors-popup__list">
                {
                arrErors.map((err, index) => { 
                    return(
                        <li id={`err${index}`} className="errors-popup__card">{/*белый фон*/}
                            <p id={`err${index}`} className="errors-popup__text">{err}</p>{/*текст ошибки*/}
                            <button id={`err${index}`} className="link popup__close-btn errors-popup__close-btn" onClick={onClose}></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}