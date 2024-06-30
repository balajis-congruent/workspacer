import './App.css';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import axios from "axios";
import { mapper } from './utils/mapper';
import { fetchDropdownData } from './components/DropdownField';
import buildValidationSchema from './utils/validationMapper';

function App() {

  const [ui, setUi] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3100";
    axios.get(url).then((res) => {
      console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (ui) {
      const initValues = {};
      const componentsToFetch = [];

      ui?.sublayout.components.forEach(component => {
        if (component.type !== "submit") {
          initValues[component.name] = '';
          console.log("init value", initValues);
        }
        if (component.type === "dropdown") {
          componentsToFetch.push(component);
        }
      });
      setValidationSchema(buildValidationSchema(ui?.sublayout.components.filter(comp => comp.type !== "submit")));

      setInitialValues(initValues);
      setComponents(componentsToFetch);
    }
  }, [ui]);

  useEffect(() => {
    async function fetchData() {
      const dataMap = {};
      for (let component of components) {
        if (component.type === "dropdown") {
          const dropdownData = await fetchDropdownData(component.data_url);
          dataMap[component.name] = dropdownData;
          console.log("Data for component", component.name, dropdownData);
        }
      }
      setData(dataMap);
    }

    if (components.length > 0) {
      fetchData();
    }
  }, [components]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}>
        <Form>
          {
            ui?.sublayout.components.map(component => {
              return mapper(component.type)(component, data[component.name] || []);
            })
          }
        </Form>
    </Formik>
  );
}

export default App;
