import React from 'react';
import {Button} from 'react-bootstrap';

const ButtonFieldComponent = (props) => {
return (
      <Button {...props}>{props.label}</Button>
  )
}

export default ButtonFieldComponent