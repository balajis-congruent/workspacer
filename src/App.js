import logo from './logo.svg';
import './App.css';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import axios from "axios"
import { mapper } from './utils/mapper'
import { First } from 'react-bootstrap/esm/PageItem';


function App() {

  const [ui, setUi] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = "http://localhost:3100"
    try {
      axios.get(url).then((res) => {
        console.log(res.data);
        setUi(res.data);
      }).catch((err) => {
        console.log(err)
      })
    }
    catch (err) {
      console.log(err);
    }
  },[])

  useEffect(() => {
    const initValues = {};
    ui?.sublayout.components.forEach(component => {
      if (component.type != "submit")
        initValues[component.name] = '';
    });
    setInitialValues(initValues);
  },[ui])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}>
      <Form>
        {
          ui?.sublayout.components.map(component => {
            return mapper(component.type)(component, data);
          })
        }
      </Form>
    </Formik>

  );
}

export default App;
