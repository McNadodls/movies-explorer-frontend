import React from "react";

export default function Form(props) {
  return (
      <form className={`form ${props.className}`} onSubmit={props.onSubmit} noValidate>
        {props.children}
      </form>
    
  )
}