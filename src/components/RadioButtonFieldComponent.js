import React from 'react';
import { Form } from 'react-bootstrap';


const RadioButtonFieldComponent = (properties) => {
    const { props, data } = properties;
    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{props.label}</label>
            {data[props.name] && data[props.name].map(option => {
                return (
                    <Form.Check inline type="radio" label={option} name={props.name}/>

                )
            })}
        </div>
    )

}


export default RadioButtonFieldComponent