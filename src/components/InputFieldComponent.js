import { ErrorMessage, Field } from 'formik';
import { Form } from 'react-bootstrap';
import { mapper } from '../utils/mapper';
import ClickComponent from './ClickComponent';
import React, { useEffect, useState } from "react";
import TableComponent from './TableComponent';

const InputFieldComponent = (properties) => {
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

    const {props, events, childComp, data} = properties;


    console.log("Child Comp :",Object.values(childComp));
    return (
        <div style={{display:"list-item", marginLeft:"2rem"}}>
        <label>{props.label} :</label>
        <Form.Control {...props} />
        {childComp && Object.values(childComp).map(child => {
            console.log("Data",data[child.props.name]);
            // const statePropsToSend = child.stateProps.map(stateProp => {
            //   stateProp
            // })
            // const eventsToSend = child.events.map((event) => {
            //   return {
            //     function: mapper(event.event_type),
            //     ...event.event_name
            //   }; 
            // })
            return (mapper(child.type)({...{props:{...child.props}, data: data[child.props.name], stateProps: {isAdd: isAdd, onClick: toggleRehireDetails} }}));
        })}
        {/* <p onClick={toggle}>
          {isAdd === false ? "View Rehire Details" : "Hide Rehire Details"}
        </p>
        {isAdd && <TableComponent {...{props:{...childComp[1].props}, data:data[childComp[1].props.name]}}/>} */}
        </div>

    )

}

export default InputFieldComponent