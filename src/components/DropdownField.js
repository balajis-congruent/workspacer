import React from 'react'
import { Field, ErrorMessage } from 'formik';
import axios from 'axios';


const fetchDropdownData = async (dataUrl) => {
    try {
        const response = await axios.get(dataUrl);
        const optionsArray = Object.values(response.data.options);
        console.log('Dropdown data:', optionsArray);
        return optionsArray;
    } catch (error) {
        console.error('Error fetching dropdown data:', error);
        return [];
    }
};

const DropdownField = (props, data) => {
    console.log("Data in drop", data);
    return (
        <div style={{ display: "list-item", paddingLeft: "50%", }} >
            <label>{props.label}</label>
            <Field {...props} component="select">
                <option value="" disabled>Select {props.name}</option>
                {
                    data && data.map(option => {
                        return (<option key={option} value={option}>{option}</option>)
                    })
                }
            </Field>
            <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
        </div>
    )
}

export { fetchDropdownData, DropdownField }