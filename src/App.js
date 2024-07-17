import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { renderLayout } from './utils/mapper';
import './css/layouts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlidingPanel from './components/SlidingPanel';
import { Button } from 'react-bootstrap';
import {toggleMachine} from "./machines/workspacerMachines"
import {useMachine} from "@xstate/react"

function App() {

  const [ui, setUi] = useState(null);
  const [layouts, setLayouts] = useState([]);
  const [state,send]= useMachine(toggleMachine)
  useEffect(() => {
    const url = "http://localhost:3100";
    axios.get(url).then((res) => {
      console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      //console.log(err);
    });
  }, []);

  return (
    <>
      {/* {
        ui?.sublayouts && ui?.sublayouts.map((layout, index) => {
          return <div id={layout.name} key={index}> {renderLayout(layout)} </div>
        })


      } */
      
              
      }
      <div>state.value is : {JSON.stringify(state.value)}</div>
      <div>state.status is : {JSON.stringify(state.status)}</div>


      {
        ui?.sublayouts && ui?.sublayouts.map((layout, index) => {
          // return <SlidingPanel   id={layout.name} key={index}> {renderLayout(layout)} </SlidingPanel>
          if (layout.type == "slider")
            return <SlidingPanel isOpen={state.value=="Active" ? true: false } id={layout.name} key={index}>{renderLayout(layout)}</SlidingPanel>
          else {
            return <div id={layout.name} key={index}> {renderLayout(layout)} </div>
          }
        })

      }
      {/* <SlidingPanel isPaneOpen={} ></SlidingPanel> */}
      <Button onClick={()=>{
        send({type: "toggle"})
      }}  >Open Panel</Button>
    </>
  )
}
export default App
