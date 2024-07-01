import React from 'react';

const buttonFieldComponent = (props, data=null) => {
return (
    <>
    { console.log()}
      <button style={{display:"list-item", marginLeft:"50%"}} {...props}>{props.label}</button>
    </>
  )
}

export default buttonFieldComponent