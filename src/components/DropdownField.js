import React from 'react'
import Field from 'formik';
const DropdownField = (props, events, data) => {
    console.log("props in form",props)
    return (
        <Field as="select">
        {
            data.options.map(option => {
            return (<option value={option}>{option}</option>)
            })
        }
        </Field>
    )
}

export default DropdownField