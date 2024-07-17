import { useState } from "react";

const ClickComponent = (properties) => {
    const { props, data, stateProps, events  } = properties;
    console.log("Link props:", stateProps.isVisible);

    return (
        <p onClick={stateProps.onClick}>
            {stateProps.isVisible === false? "View" : "Hide"} {props.label}
        </p>)
}
export default ClickComponent;