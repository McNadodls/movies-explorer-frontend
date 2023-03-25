import React, { useEffect, useState } from "react";


export default function Input({handleChange, valueInput, classNameInput, classNameErr, isSpan, ...rest }) {

  const [error, setError] = useState('');

  function onChange(e) {
    handleChange(e);
    checkValidity(e);
  }

  function checkValidity(e) {
    if (e.target.validationMessage) {
      setError(e.target.validationMessage)
    } else {
      setError('');
    }
  }

  return (
    <>
      <input onChange={onChange} value={valueInput} className={`input ${classNameInput} ${error? "input__error" : ""}`} {...rest} />
      {isSpan ? 
      <span className={`input__error ${classNameErr}`}>{error}</span> 
      : <></>}
    </>
  )
}