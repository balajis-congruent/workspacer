import React from 'react'
import { ErrorMessage } from 'formik';
import axios from 'axios';


const fetchDropdownData = async (dataUrl) => {
    try {
        console.log("URL :", dataUrl)
        const response = await axios.get(dataUrl);
        const optionsArray = Object.values(response.data.options);
        console.log('Response data:', optionsArray);
        return optionsArray;
    } catch (error) {
        console.error('Error fetching dropdown data:', error);
        return [];
    }
};


const DropdownFieldComponent = (properties) => {

    const { props, events, childComp, data } = properties;

    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{props.label} :</label>
            <select>
                <option disabled>Select {props.label}</option>
                {data[props.name] && data[props.name].map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export { fetchDropdownData, DropdownFieldComponent }