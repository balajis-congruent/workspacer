import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { renderLayout } from './utils/mapper';
import './css/layouts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [ui, setUi] = useState(null);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3100";
    axios.get(url).then((res) => {
      //console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      //console.log(err);
    });
  }, []);

  return (
    <>
      {
        ui?.sublayouts && ui?.sublayouts.map((layout, index) => {
          return <div id={layout.name} key={index}> {renderLayout(layout)} </div>
        })
      }
    </>
  )
}
export default App
