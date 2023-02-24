import React from "react";

export default function Input({handleChange, valueInput, classNameInput, classNameErr, errMassage, isSpan, ...rest }) {
  
  return (
    <>
      <input onChange={handleChange} value={valueInput} className={`input ${classNameInput} ${errMassage? "input__error" : ""}`} {...rest} />
      {isSpan ? 
      <span className={`input__error ${classNameErr}`}>{errMassage}</span> 
      : <></>}
    </>
  )
}