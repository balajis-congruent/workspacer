import React from 'react'
import { ErrorMessage } from 'formik';
import axios from 'axios';
import { Form } from 'react-bootstrap';


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

    const { label, fieldname, events, childcomp, data, onChange } = props;
    console.log("Data for dropdown :",data);

    return (
        <div style={{ display: "list-item", marginLeft: "2rem" }}>
            <label>{label} :</label>
            <Form.Select name={fieldname}onChange={onChange}>
                <option disabled>Select {label}</option>
                {data[fieldname] && data[fieldname].map((option, index) => {
                    return (
                        <option id={index} key={index}>
                            {option}
                        </option>
                    );
                })}
            </Form.Select>
            {/* <ErrorMessage name={fieldname} className="error" style={{ color: 'red' }} /> */}
        </div>
    )
}

export { fetchDropdownData, DropdownFieldComponent }