import { ErrorMessage, Field } from 'formik';
import { Form } from 'react-bootstrap';
import { mapper } from '../utils/mapper';
import ClickComponent from './ClickComponent';
import React, { useEffect, useState } from "react";
import TableComponent from './TableComponent';

const InputFieldComponent = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const eventMapper = [
    {
      type: "toggleVisible",
      action: toggleVisible
    }
  ];
  const { label, fieldname, events, childcomp, data } = props;
  console.log("Child Comp :", Object.values(childcomp));
  return (
    <div key="input-field" style={{ display: "list-item", marginLeft: "2rem" }}>
      <label>{label} :</label>
      <Form.Control {...props} />
      {childcomp && Object.values(childcomp).map(child => {
        console.log("Data", data[child.props.fieldname]);
          //all the children component get mapped with stateprops { toggleShow , Enabled/Disabled ,  }
        return (mapper(child.type)({ ...{ props: { ...child.props }, data: data[child.props.fieldname], stateProps: { isVisible: isVisible, onClick: toggleVisible } } }));
      })}

    </div>

  )

}

export default InputFieldComponent