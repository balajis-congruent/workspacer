import React from 'react'
import Field from 'formik';
const InputField = (props) => {
    console.log("props in form",props)
    return (
        <Field {...props} />
    )
}

export default InputField