import React, { useEffect } from 'react'
import { Field } from 'formik';
import axios from 'axios';

const DropdownField = (props) => {
    let [data,setData] = [];

    axios.get(props.data_url).then((res) => {
        console.log('Dropdown data: ', res.data.options);
        setData(res.data.options);
    }).catch(err => {
        console.error('Error fetching dropdown data: ', err);
    });

    return (
        <Field as="select">
            {
                data && data.map(option => {
                    return (<option key={option} value={option}>{option}</option>)
                })
            }
        </Field>
    )
}

export default DropdownField