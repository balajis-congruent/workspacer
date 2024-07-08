import { ErrorMessage, Field } from 'formik';
import { Form } from 'react-bootstrap';
import { mapper } from '../utils/mapper';
import ClickComponent from './ClickComponent';
import React, { useEffect, useState } from "react";
import TableComponent from './TableComponent';

const InputFieldComponent = (props) => {
    const [isAdd, setIsAdd] = useState(false);
    const toggleRehireDetails = () => {
      setIsAdd(!isAdd);
    };

    const eventMapper = [
      {
        type:"toggle-RehireDetails",
        action: toggleRehireDetails
      }
    ];

    const {label, fieldname, events, childcomp, data} = props;


    console.log("Child Comp :",Object.values(childcomp));
    return (
        <div key="input-field" style={{display:"list-item", marginLeft:"2rem"}}>
        <label>{label} :</label>
        <Form.Control {...props} />
        {childcomp && Object.values(childcomp).map(child => {
            console.log("Data",data[child.props.fieldname]);
            // const statePropsToSend = child.stateProps.map(stateProp => {
            //   stateProp
            // })
            // const eventsToSend = child.events.map((event) => {
            //   return {
            //     function: mapper(event.event_type),
            //     ...event.event_name
            //   }; 
            // })
            return (mapper(child.type)({...{props:{...child.props}, data: data[child.props.fieldname], stateProps: {isAdd: isAdd, onClick: toggleRehireDetails} }}));
        })}
        {/* <p onClick={toggle}>
          {isAdd === false ? "View Rehire Details" : "Hide Rehire Details"}
        </p>
        {isAdd && <TableComponent {...{props:{...childcomp[1].props}, data:data[childcomp[1].props.name]}}/>} */}
        </div>

    )

}

export default InputFieldComponent