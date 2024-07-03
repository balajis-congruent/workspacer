import React from 'react';
import { Form } from 'react-bootstrap';


const RadioButtonFieldComponent = (props) => {
    const { label,fieldName, data } = props;
    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{label}</label>
            {data[fieldName] && data[fieldName].map(option => {
                return (
                    <Form.Check inline type="radio" label={option} name={fieldName}/>

                )
            })}
        </div>
    )

}


export default RadioButtonFieldComponent