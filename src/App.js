import './App.css';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import axios from "axios";
import { mapper } from './utils/mapper';
import { fetchDropdownData } from './components/DropdownField';
import buildValidationSchema from './utils/validationMapper';
import { Form } from 'react-bootstrap';

function App() {

  const [ui, setUi] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3100";
    axios.get(url).then((res) => {
      //console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      //console.log(err);
    });
  }, []);

  useEffect(() => {
    if (ui) {
      const initValues = {};
      const componentsToFetch = [];

      ui?.sublayout.components.forEach(component => {
        if (component.type !== "submit") {
          initValues[component.name] = '';
          //console.log("init value", initValues);
        }
        if (component.type === "dropdown" || "radio") {
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
        if (component.type === "dropdown" || "radio") {
          const dropdownData = await fetchDropdownData(component.data_url);
          dataMap[component.name] = dropdownData;
          //console.log("Data for component", component.name, dropdownData);
        }
      }
      setData(dataMap);
    }

    if (components.length > 0) {
      fetchData();
    }
  }, [components]);

  return (
    <>
      <p style={{ margin: "20px 0px 20px 30px", fontSize: "1.25rem", fontWeight: "500" }}>Personal Information</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log("Values : ", values);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        >
        {(formikProps) => {
          const {
            handleChange,
            setFieldValue,
            handleSubmit,
            setValues,
            setTouched,
            values,
            setSubmitting,
            setFieldError,
            fieldValue,
            errors,
            ...rest
          } = formikProps;
          console.log("Errors : ", errors);
          return (<Form onSubmit={handleSubmit} style={{ fontSize: ".75rem", color: "#495057", border: "1px solid #949494" }}>
            {
            ui?.sublayout.components.map(component => {
              return mapper(component.type)(component, data[component.name] || []);
              })
            }
          </Form>
          )
        }}
      </Formik>
    </>
  );
}

export default App;
