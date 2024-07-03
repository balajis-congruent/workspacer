import { useState } from "react";

const ClickComponent = (properties) => {
    const { props, data, stateProps, events  } = properties;
    console.log("Link props:", stateProps.isAdd);

    return (
        <p onClick={stateProps.onClick}>
            {stateProps.isAdd === false? "View" : "Hide"} {props.label}
        </p>)
}
export default ClickComponent;