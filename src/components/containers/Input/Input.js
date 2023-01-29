import React from "react";

export default function Input({labelText, isSpan, ...rest }) {
  return (
    <>
      <input {...rest} />
      <span className="input__error"></span>
    </>
  )
}