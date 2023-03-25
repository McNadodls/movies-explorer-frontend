import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { clearSignErr } from "../../../store/signSlice";
import { clearMovieErr } from "../../../store/moviesSlice";

export default function ErrorsPopup() {
    const dispatch = useDispatch();

    const messageSign = useSelector(state => state.sign.message);
    const errorSign = useSelector(state => state.sign.error);
    const errorMovie = useSelector(state => state.movies.error);
    const [arrErors, setArrErors] = useState([]);

    useEffect(() =>{
        if (messageSign != null) { 
            setArrErors([{text: messageSign, isErr: false}, ...arrErors])
            dispatch(clearSignErr())
        }
        if (errorSign != null) {
            setArrErors([{text: errorSign, isErr: true}, ...arrErors])
            dispatch(clearSignErr())
        }
        if (errorMovie != null) {
            setArrErors([{text: errorMovie, isErr: true}, ...arrErors])
            dispatch(clearMovieErr())
        }
    }, [messageSign, errorSign, errorMovie])
    
    function onClose (e) {
        e.preventDefault();
        setArrErors(arrErors.filter((err, index) => {
            if (`err${index}` === e.target.id) {
                return(null)
            }else{
            return(err)}
        }))
    }

    return (
        <div className="errors-popup">
            <ul className="errors-popup__list">
                {
                arrErors.map((err, index) => { 
                    return(
                        <li id={`err${index}`} className={`errors-popup__card ${err.isErr? "errors-popup__card_type_error" : "errors-popup__card_type_confirm" }`}>
                            <p id={`err${index}`} className="errors-popup__text">{err.text}</p>
                            <button id={`err${index}`} className="link popup__close-btn errors-popup__close-btn" onClick={onClose}></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}