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


const DropdownFieldComponent = (props) => {

    const { label, fieldName, events, childComp, data } = props;
    console.log("Data for dropdown :",data);

    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{label} :</label>
            <select>
                <option disabled>Select {label}</option>
                {data[fieldName] && data[fieldName].map((option, index) => {
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