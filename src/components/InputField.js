import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik';
import TableComponent from './TableComponent';
const InputField = (props, events, data) => {
    console.log("props in form", props)
    const [show, setShow] = useState(false);
    const toggleDetails = () => {
        setShow(!show)
    };
    return (
        <div style={{ display: "list-item", paddingLeft: "50%", paddingTop: "20px", fontWeight: "400", color: "#32699d" }}>
            <label style={{ display: "list-item" }}>{props.validations.required ? props.label + "*" : props.label}</label>
            <Field style={{ fontSize: ".75rem" }} {...props} />

            {/* <Form.Control {...props} /> */}
            <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
            {
                props.children && 
                <p onClick={toggleDetails}>
                    {show === false ? "View Rehire Details" : "Hide Rehire Details"}
                </p>
            }
            {show === true ? (
                <TableComponent {...{props:{...props.children}, data:{data}}}/>
            ) : null}
        </div>
    )
}

export default InputField