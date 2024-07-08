import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';


const RadioButtonFieldComponent = (props) => {
    const { label,fieldname, data } = props;
    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{label}</label>
            {data[fieldname] && data[fieldname].map((option,index) => {
                return (
                    <Form.Check key={index} inline type="radio" label={option} name={fieldname}/>

                )
            })}
            {/* <ErrorMessage name={fieldname} className="error" style={{ color: 'red' }} /> */}
        </div>
    )

}


export default RadioButtonFieldComponent