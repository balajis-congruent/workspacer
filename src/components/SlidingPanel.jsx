import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useMachine } from "@xstate/react";
import React, { useState } from 'react'
import { toggleMachine } from "../machines/workspacerMachines";

const SlidingPanel = (props) => {
    const [state,send]=useMachine(toggleMachine)
    console.log("children in sliding panel",props);
    
    // const [state, setState] = useState({
    //     isPaneOpen: props.isPaneOpen,
    // });


    return (
        <div>
            {/* <button onClick={() => setState({ isPaneOpen: true })}>
                Click me to open right pane!
            </button> */}
            {
                console.log("Sliding state machine", state.value)
            }
            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={props.isOpen}
                title="Hey, it is optional pane title.  I can be React component too."
                subtitle="Optional subtitle."
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    console.log("Hellow world")
                    send({type:"toggle"})
                }}
            >
            {/* {children} */}
            <div>
                {props.children}
            </div>
            </SlidingPane>
        </div>

    )
}

export default SlidingPanel