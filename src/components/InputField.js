import React from 'react'
import { Field, ErrorMessage } from 'formik';
const InputField = (props, data = null) => {
    console.log("props in form", props)
    return (
        <div style={{ display: "list-item", paddingLeft: "50%", }}>
            <Field {...props} />
            <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
        </div>
    )
}

export default InputField