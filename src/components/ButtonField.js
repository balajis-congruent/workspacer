import React from 'react';

const ButtonField = (props, data=null) => {
return (
    <>
      <button style={{display:"list-item", marginLeft:"50%"}} {...props}>{props.label}</button>
    </>
  )
}

export default ButtonField