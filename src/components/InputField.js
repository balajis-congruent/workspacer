import React from 'react'
import {Field, ErrorMessage} from 'formik';
const InputField = (props, events, data=null) => {
    console.log("props in form", props)
    return (
        <div style={{ display: "list-item", paddingLeft: "50%", paddingTop: "20px", fontWeight: "400", color: "#32699d" }}>
            <label style={{ display: "list-item" }}>{props.validations.required ? props.label + "*" : props.label}</label>
            <Field style={{fontSize: ".75rem"}} {...props} />

            {/* <Form.Control {...props} /> */}
            <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
        </div>
    )
}

export default InputField