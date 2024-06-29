import React from 'react';

const ButtonField = (props) => {
return (
    <>
      <button {...props}>{props.label}</button>
    </>
  )
}

export default ButtonField